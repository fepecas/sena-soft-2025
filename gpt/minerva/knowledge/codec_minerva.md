# Codec MINERVA v1 — Continuidad entre chats

**Exportar**: di “Quiero exportar mi progreso” o “Dame mi código MINERVA”; MINERVA entrega un **resumen formateado** (NO JSON) y, al final, la cadena `MINERVA|<base64url(...)>` lista para copiar.


**JSON mínimo**
```json
{
  "v":"1",
  "t":"<ISO8601>",
  "scope":["contexto_vivo","three_amigos","evidencias"],
  "cv":{"problema":"","usuario":"","resultado":"","metricas":[]},
  "ds":{"esquema":"","cobertura":""},
  "ta":{"po":"","dev":"","qa":""},
  "orc":{"quiliano":"","magnus":"","otros":""},
  "ev":{"j1":"","j2":"","k":""},
  "refs":{"quiliano":"QUILIANO|...", "magnus":"MAGNUS|..."},
  "hist":["nota breve 1","nota breve 2"]
}


