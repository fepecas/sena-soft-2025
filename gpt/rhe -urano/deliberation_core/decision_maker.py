from rhea.ethics_engine import Rhea
from urano.strategy_engine import Urano

class DeliberationEngine:
    def __init__(self):
        self.rhea = Rhea()
        self.urano = Urano()

    def generar_respuesta(self, entrada: str) -> str:
        respuesta_rhea = self.rhea.evaluar(entrada)
        respuesta_urano = self.urano.responder(entrada)

        return (
            "🟢 Evaluación ética (Rhea):\n" +
            respuesta_rhea +
            "\n\n🔵 Recomendación estratégica (Urano):\n" +
            respuesta_urano +
            "\n\n💬 ¿Tienes otra idea o quieres afinar esta?"
        )
