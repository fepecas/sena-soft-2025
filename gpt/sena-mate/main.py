"""
SENA-Mate API - main.py
Versión: integrada con prints de depuración + comentarios detallados
Objetivo: conservar la funcionalidad actual y añadir trazas (prints) para
ver entradas, salidas y errores en cada paso.
Nota de seguridad: NO imprimimos HF_TOKEN completo (solo si existe).
"""

# -----------------------------
# IMPORTS
# -----------------------------
import os
import json
import re
import time
import traceback
from typing import Dict, List

# FastAPI + validaciones
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

# Cliente "openai" que estamos usando como gateway hacia Hugging Face router
# (tu setup actual usa OpenAI SDK con base_url="https://router.huggingface.co/v1")
from openai import OpenAI

# Cargar .env (si usas .env)
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# -----------------------------
# CARGA DE VARIABLES DE ENTORNO
# -----------------------------
load_dotenv()  # busca .env en la raíz del proyecto

print("[startup] leyendo variables de entorno...")
HF_TOKEN = os.environ.get("HF_TOKEN")  # token que usas con Hugging Face router
CHAT_MODEL = os.environ.get("CHAT_MODEL", "openai/gpt-oss-20b")  # modelo por defecto (configurable)
COMPLETION_MODEL = os.environ.get("COMPLETION_MODEL", CHAT_MODEL)  # reusar si no se define distinto

# imprimimos solamente si existe (no mostramos el token)
print(f"[startup] HF_TOKEN encontrado: {bool(HF_TOKEN)} (token no mostrado por seguridad)")
print(f"[startup] CHAT_MODEL seleccionado: {CHAT_MODEL}")

if not HF_TOKEN:
    # si no hay token lanzamos excepción en startup (para que se note al iniciar)
    raise RuntimeError("HF_TOKEN no encontrado. Define HF_TOKEN en variables de entorno o .env")

# -----------------------------
# INICIALIZAR CLIENTE (OpenAI wrapper apuntando al router de HF)
# -----------------------------
print("[startup] inicializando cliente OpenAI (router Hugging Face)...")
try:
    client = OpenAI(
        base_url="https://router.huggingface.co/v1",  # router HF compatible con interfaz OpenAI
        api_key=HF_TOKEN,
    )
    print("[startup] cliente inicializado correctamente.")
except Exception as e:
    print("[startup][error] fallo al inicializar cliente:", str(e))
    raise

# -----------------------------
# INICIALIZAR APP FASTAPI
# -----------------------------
app = FastAPI(title="SENA-Mate API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # permite todas las URLs (para desarrollo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# CARGAR PROMPT (prompts/prompt.json)
# -----------------------------
PROMPT_PATH = "prompts/prompt.json"

def load_prompt(path: str) -> Dict:
    """
    Carga prompt.json y asegura estructura mínima:
    {
      "system": "...",
      "few_shots": [ { "title": "...", "description": "...", "checklist": [...] }, ... ]
    }
    Si falla, devuelve valores por defecto para no romper la app.
    """
    print(f"[load_prompt] cargando prompt desde: {path}")
    if not os.path.exists(path):
        print("[load_prompt] archivo no existe, usando prompt por defecto.")
        return {"system": "SENA-Mate (prompt por defecto)", "few_shots": []}
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        # validaciones mínimas
        if "system" not in data:
            print("[load_prompt] 'system' faltante en prompt.json -> se añade default")
            data["system"] = "SENA-Mate (sin 'system' en prompt.json)"
        if "few_shots" not in data or not isinstance(data["few_shots"], list):
            print("[load_prompt] 'few_shots' inválido o ausente -> se pone lista vacía")
            data["few_shots"] = []
        print(f"[load_prompt] prompt cargado. few_shots_count={len(data['few_shots'])}")
        return data
    except Exception as e:
        print("[load_prompt][error] error leyendo prompt.json:", str(e))
        return {"system": f"SENA-Mate (error leyendo prompt.json: {e})", "few_shots": []}

PROMPT_DATA = load_prompt(PROMPT_PATH)

# -----------------------------
# Pydantic models (validación de entradas)
# -----------------------------
class AskRequest(BaseModel):
    # Valida que la pregunta exista y tenga al menos 5 caracteres
    question: str = Field(..., min_length=5, description="Pregunta clara para la IA")

class PrepPRRequest(BaseModel):
    # Valida que title/description tengan longitud mínima
    title: str = Field(..., min_length=5, description="Título del Pull Request")
    description: str = Field(..., min_length=10, description="Descripción detallada del PR")

# -----------------------------
# STOPWORDS y helpers para checklist
# -----------------------------
STOPWORDS = {
    "a","al","algo","algun","alguna","algunas","algunos","ante","antes","como","con","contra","cual","cuales",
    "de","del","desde","donde","e","el","ella","ellas","ellos","en","entre","era","eramos","eran","eres","es","esa",
    "esas","ese","eso","esos","esta","estaba","estaban","estado","estar","este","estos","fue","fueron","ha","habia",
    "habiamos","han","hasta","la","las","le","les","lo","los","mas","me","mi","mis","mucho","muy","no","nos",
    "nuestra","nuestro","o","otra","otro","para","pero","poco","por","porque","que","se","ser","si","sin","sobre",
    "su","sus","te","tiene","tienen","tu","tus","un","una","uno","y","ya"
}

def to_keywords(text: str) -> set:
    """Convierte texto a conjunto de keywords (sin stopwords)."""
    tokens = re.findall(r"\b\w+\b", text.lower())
    kw = {t for t in tokens if t not in STOPWORDS and len(t) > 2}
    print(f"[to_keywords] entrada_len={len(text)} tokens_count={len(tokens)} keywords_count={len(kw)}")
    return kw

def score_template(pr_kw: set, tpl_title: str, tpl_desc: str) -> int:
    """Cuenta solapamiento de keywords entre PR y template."""
    tpl_kw = to_keywords(f"{tpl_title} {tpl_desc}")
    score = len(pr_kw & tpl_kw)
    return score

def build_checklist(title: str, description: str, prompt_data: Dict) -> Dict:
    """
    Construye el checklist combinando una base común y elementos de few_shots que coincidan.
    Imprime trazas para depuración.
    """
    print(f"[build_checklist] generando checklist para title_len={len(title)} desc_len={len(description)}")
    # Lista base siempre incluida
    base = [
        "Título claro y descriptivo",
        "Descripción con contexto",
        "Código probado y funcional",
        "Documentación actualizada",
        "Cumple con estándares del proyecto"
    ]

    # Extraer keywords del PR (título + descripción)
    pr_kw = to_keywords(f"{title} {description}")
    print(f"[build_checklist] keywords_pr={pr_kw}")

    matches: List[Dict] = []
    merged: List[str] = base.copy()

    # Recorrer few_shots para hallar coincidencias
    for tpl in prompt_data.get("few_shots", []):
        tpl_title = tpl.get("title", "")
        tpl_desc = tpl.get("description", "")
        tpl_checklist = tpl.get("checklist", [])
        tpl_kw = to_keywords(f"{tpl_title} {tpl_desc}")

        # Mostrar el template y sus keywords
        print(f"[build_checklist] evaluando template='{tpl_title}' tpl_kw={tpl_kw} checklist_len={len(tpl_checklist)}")

        # Calcular score (coincidencia por keywords)
        score = score_template(pr_kw, tpl_title, tpl_desc)
        print(f"[build_checklist] score para template '{tpl_title}': {score}")

        if score > 0 and tpl_checklist:
            matches.append({
                "template_title": tpl_title,
                "score": score,
                "added": tpl_checklist
            })
            print(f"[build_checklist] template '{tpl_title}' agregado a matches")

    # Ordenar por score descendente
    matches.sort(key=lambda x: x["score"], reverse=True)
    print(f"[build_checklist] matches encontrados: {len(matches)}")

    # Agregar ítems adicionales sin duplicar
    seen = set(merged)
    for m in matches:
        for item in m["added"]:
            if item and item not in seen:
                merged.append(item)
                seen.add(item)
                print(f"[build_checklist] item agregado desde template '{m['template_title']}': {item}")

    print(f"[build_checklist] checklist final ({len(merged)} items): {merged}")

    # Estructura limpia para frontend
    return {
        "status": "ok",
        "data": {
            "title": title,
            "description": description,
            "checklist": merged,
            "matched_templates": matches,
            "prompt_used": prompt_data.get("system", "no prompt loaded")
        }
    }

# -----------------------------
# UTIL: llamar al modelo chat (traza + manejo de excepciones)
# -----------------------------
def call_chat_model(model: str, messages: List[Dict], timeout_seconds: int = 30):
    """
    Llama al endpoint chat/completions usando el cliente (OpenAI SDK configurado al router HF).
    Devuelve el objeto respuesta o lanza excepción.
    Esta función centraliza prints de request/response y errores.
    """
    start = time.time()
    print(f"[call_chat_model] llamando modelo='{model}' messages_count={len(messages)}")
    try:
        # Llamada al endpoint de chat completions
        resp = client.chat.completions.create(
            model=model,
            messages=messages,
        )
        duration = time.time() - start
        # Resumen de la respuesta (no imprimimos todo para evitar dumps enormes)
        try:
            choices_len = len(resp.choices) if hasattr(resp, "choices") else "unknown"
        except Exception:
            choices_len = "unknown"
        print(f"[call_chat_model] respuesta recibida en {duration:.2f}s choices={choices_len}")
        return resp
    except Exception as e:
        duration = time.time() - start
        print(f"[call_chat_model][error] modelo='{model}' fallo en {duration:.2f}s -> {e}")
        # imprimir trazas completas para depuración
        traceback.print_exc()
        # relanzar para que el endpoint lo capture y convierta en HTTPException
        raise

# -----------------------------
# ENDPOINTS
# -----------------------------
@app.get("/")
def root():
    """Endpoint de salud / raíz."""
    print("[/][GET] root solicitado")
    return {"message": "SENA-Mate API funcionando (prompt.json integrado)"}

@app.post("/ask")
def ask_ai(request: AskRequest):
    """
    Endpoint general /ask:
    - Valida la pregunta con Pydantic (AskRequest).
    - Construye mensajes usando PROMPT_DATA['system'].
    - Llama a call_chat_model usando CHAT_MODEL (configurable).
    - Devuelve la respuesta en formato limpio.
    """
    print("[/ask][POST] solicitud recibida")
    print(f"[/ask] pregunta_raw: '{request.question}'")

    # Validación extra (aunque Pydantic ya la hace)
    if not request.question or not request.question.strip():
        print("[/ask][validation] pregunta vacía detectada")
        raise HTTPException(status_code=400, detail="La pregunta está vacía")

    # Construir mensajes (mantener contexto del system)
    system_prompt = PROMPT_DATA.get("system", "")
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": request.question.strip()}
    ]
    print(f"[/ask] system_prompt (len={len(system_prompt)}), mensajes preparados")

    # Intentar llamada al modelo (usa CHAT_MODEL por defecto)
    try:
        resp = call_chat_model(model=CHAT_MODEL, messages=messages)
        # extraer contenido si existe
        if hasattr(resp, "choices") and resp.choices:
            # varios wrappers devuelven distintos formatos; intentamos leer de forma robusta
            try:
                raw_message = resp.choices[0].message
                # raw_message puede ser objeto o dict; intentar extraer .content o ["content"]
                content = None
                if hasattr(raw_message, "content"):
                    content = raw_message.content
                elif isinstance(raw_message, dict):
                    content = raw_message.get("content")
                # fallback a .text o repr
                if content is None:
                    content = getattr(resp.choices[0], "text", repr(resp.choices[0]))
            except Exception:
                # fallback si estructura inesperada
                content = repr(resp)
            print(resp)
            print(f"[/ask] contenido extraído (len={len(str(content))})")
            return {
                "question": request.question.strip(),
                "answer": content,
                "prompt_used": system_prompt,
                "source": CHAT_MODEL
            }
        else:
            print("[/ask][warning] respuesta sin 'choices' o choices vacío")
            raise HTTPException(status_code=502, detail="El modelo no devolvió respuesta válida")
    except HTTPException:
        # Re-lanzar HTTPException tal cual (errores ya manejados)
        raise
    except Exception as e:
        # Captura general: imprimimos traza y devolvemos 500
        print("[/ask][error] excepción inesperada:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error procesando la solicitud: {str(e)}")

@app.post("/hf_ask")
def hf_ask(request: AskRequest):
    """
    Endpoint específico para llamadas tipo 'hf_ask'.
    Mismos pasos que /ask pero con trazas adicionales y model elegido explícitamente.
    """
    print("[/hf_ask][POST] solicitud recibida")
    print(f"[/hf_ask] pregunta: '{request.question}'")

    if not request.question or not request.question.strip():
        print("[/hf_ask][validation] pregunta vacía")
        raise HTTPException(status_code=400, detail="La pregunta es demasiado corta o está vacía")

    # Mensajes con system del prompt.json (más trazas)
    system_prompt = PROMPT_DATA.get("system", "Eres SENA-Mate, responde de forma concisa.")
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": request.question.strip()}
    ]
    print(f"[/hf_ask] usando system_prompt (len={len(system_prompt)})")
    print(f"[/hf_ask] intentando modelo: {CHAT_MODEL}")

    try:
        # Llamada centralizada (imprime trazas internas)
        resp = call_chat_model(model=CHAT_MODEL, messages=messages)

        # Extraer respuesta de forma segura
        if hasattr(resp, "choices") and resp.choices:
            try:
                # similar extracción robusta
                raw_message = resp.choices[0].message
                if hasattr(raw_message, "content"):
                    answer_text = raw_message.content
                elif isinstance(raw_message, dict):
                    answer_text = raw_message.get("content") or raw_message.get("text") or ""
                else:
                    answer_text = getattr(resp.choices[0], "text", str(raw_message))
            except Exception:
                answer_text = str(resp)
            print(f"[/hf_ask] respuesta obtenida (len={len(str(answer_text))})")
            return {"answer": answer_text, "source": CHAT_MODEL}
        else:
            print("[/hf_ask][warning] respuesta sin choices")
            raise HTTPException(status_code=502, detail="El modelo no devolvió respuesta válida")
    except HTTPException:
        raise
    except Exception as e:
        print("[/hf_ask][error] excepción:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error llamando al modelo: {str(e)}")

@app.post("/prepPR")
def prepare_pr(request: PrepPRRequest):
    """
    Endpoint para generar checklist a partir de title + description.
    - Valida entrada con Pydantic.
    - Genera checklist usando build_checklist().
    - Devuelve JSON limpio listo para frontend.
    """
    print("[/prepPR][POST] solicitud recibida")
    print(f"[/prepPR] title: '{request.title}' description_len={len(request.description)}")

    # Validaciones extra (además de Pydantic)
    if not request.title or not request.description:
        print("[/prepPR][validation] falta title o description")
        raise HTTPException(status_code=400, detail="Faltan 'title' y/o 'description'")

    if len(request.title.strip()) < 3 or len(request.description.strip()) < 5:
        print("[/prepPR][validation] longitud insuficiente")
        raise HTTPException(status_code=400, detail="Título o descripción demasiado cortos")

    try:
        built = build_checklist(request.title, request.description, PROMPT_DATA)
        # built es { "status": "ok", "data": { ... } }
        data = built.get("data", {})
        checklist = data.get("checklist", [])
        print(f"[/prepPR] checklist_len={len(checklist)} matched_templates={len(data.get('matched_templates', []))}")

        if not checklist:
            print("[/prepPR][error] checklist vacío")
            raise HTTPException(status_code=500, detail="No se pudo generar un checklist válido.")

        # Respuesta final para frontend
        return {
            "title": data.get("title", request.title),
            "description": data.get("description", request.description),
            "checklist": checklist,
            "matched_templates": data.get("matched_templates", []),
            "prompt_used": data.get("prompt_used", PROMPT_DATA.get("system", "no prompt loaded")),
            "source": "prompt.json"
        }

    except HTTPException:
        raise
    except Exception as e:
        print("[/prepPR][error] excepción inesperada:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

# -----------------------------
# FIN DEL ARCHIVO
# -----------------------------
# Recuerda: para correr -> uvicorn main:app --reload --port 8000
# /docs en el navegador te mostrará la documentación automática (OpenAPI).
