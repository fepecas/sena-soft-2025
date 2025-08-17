from utils.pdf_reader import extraer_texto

class Rhea:
    def __init__(self):
        self.pdf_paths = [
            "gpt/rhea/docs/marco_etico_colombia.pdf",
            "gpt/rhea/docs/politica_nacional_ia_dnp.pdf",
            "gpt/rhea/docs/proyecto_ley_ia_etica.pdf"
        ]
        self.textos = [extraer_texto(path) for path in self.pdf_paths]
        self.fuente = "Documentos oficiales de ética en IA – Colombia"

    def evaluar(self, accion: str) -> str:
        resultado = []
        accion_lower = accion.lower()

        for texto in self.textos:
            if "exclusión" in accion_lower and "exclusión" in texto:
                resultado.append(f"⚠️ Riesgo detectado: exclusión ({self.fuente})")
            if "sostenibilidad" in accion_lower and "sostenibilidad" in texto:
                resultado.append(f"✅ Valor presente: sostenibilidad ({self.fuente})")
            if "comunidad" in accion_lower and "impacto" in accion_lower:
                resultado.append("🔄 Pensamiento sistémico detectado")
            if "justo" in accion_lower or "sostenible" in accion_lower:
                resultado.append("🟢 Acción potencialmente justa y sostenible")

        if not resultado:
            resultado.append("🤔 No se detectaron coincidencias explícitas en los documentos. Revisa la acción con más contexto.")

        return "\n".join(resultado)
