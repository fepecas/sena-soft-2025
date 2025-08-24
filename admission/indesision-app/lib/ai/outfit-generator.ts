import type { WardrobeItem } from "@/lib/context/app-context"
import type { WeatherData } from "@/lib/utils/weather"

export interface GeneratedOutfit {
  id: string
  name: string
  items: WardrobeItem[]
  justification: string
  occasion?: string
}

interface GenerateOutfitsParams {
  wardrobe: WardrobeItem[]
  occasion: string
  description: string
  weather: WeatherData | null
  userStyle: string
  userGender: string
}

export async function generateOutfits({
  wardrobe,
  occasion,
  description,
  weather,
  userStyle,
  userGender,
}: GenerateOutfitsParams): Promise<GeneratedOutfit[]> {
  try {
    const response = await fetch("/api/generate-outfits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wardrobe,
        occasion,
        description,
        weather,
        userStyle,
        userGender,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.outfits || []
  } catch (error) {
    console.error("Error generating outfits:", error)
    // Fallback to mock data
    return generateMockOutfits(wardrobe, occasion, description)
  }
}

function createOutfitPrompt({
  wardrobe,
  occasion,
  description,
  weather,
  userStyle,
  userGender,
}: GenerateOutfitsParams): string {
  const wardrobeList = wardrobe
    .map((item) => `- ${item.name} (${item.type}, ${item.color}, ${item.material}, ${item.category})`)
    .join("\n")

  const weatherInfo = weather
    ? `Clima actual: ${weather.temperature}°C, ${weather.description}, humedad ${weather.humidity}%`
    : "Sin información del clima"

  return `
Crea 3 combinaciones de outfits usando SOLO las prendas disponibles en el guardarropa del usuario.

GUARDARROPA DISPONIBLE:
${wardrobeList}

INFORMACIÓN DEL USUARIO:
- Ocasión: ${occasion}
- Descripción adicional: ${description || "Ninguna"}
- Estilo preferido: ${userStyle}
- Identidad de moda: ${userGender}
- ${weatherInfo}

INSTRUCCIONES:
1. Usa ÚNICAMENTE las prendas listadas arriba
2. Crea 3 combinaciones diferentes y apropiadas para la ocasión
3. Considera el clima actual en tus recomendaciones
4. Respeta el estilo y preferencias del usuario
5. Responde en formato JSON válido con esta estructura:

{
  "outfits": [
    {
      "name": "Nombre del outfit",
      "items": ["nombre exacto de prenda 1", "nombre exacto de prenda 2", "nombre exacto de prenda 3"],
      "justification": "Explicación de por qué esta combinación funciona para la ocasión y clima"
    }
  ]
}

IMPORTANTE: Los nombres de las prendas en "items" deben coincidir EXACTAMENTE con los nombres del guardarropa.
`
}

function parseAIResponse(aiResponse: string, wardrobe: WardrobeItem[], occasion: string): GeneratedOutfit[] {
  try {
    // Try to extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response")
    }

    const parsed = JSON.parse(jsonMatch[0])
    const outfits = parsed.outfits || []

    return outfits
      .map((outfit: any, index: number) => {
        // Match item names with actual wardrobe items
        const matchedItems = outfit.items
          .map((itemName: string) =>
            wardrobe.find(
              (item) =>
                item.name.toLowerCase().includes(itemName.toLowerCase()) ||
                itemName.toLowerCase().includes(item.name.toLowerCase()),
            ),
          )
          .filter(Boolean) // Remove undefined items

        return {
          id: `ai-${Date.now()}-${index}`,
          name: outfit.name || `Outfit ${index + 1}`,
          items: matchedItems,
          justification: outfit.justification || "Combinación recomendada por IA",
          occasion,
        }
      })
      .filter((outfit: GeneratedOutfit) => outfit.items.length > 0) // Only return outfits with matched items
  } catch (error) {
    console.error("Error parsing AI response:", error)
    throw error
  }
}

function generateMockOutfits(wardrobe: WardrobeItem[], occasion: string, description: string): GeneratedOutfit[] {
  // Fallback mock data when AI is not available
  const mockOutfits: GeneratedOutfit[] = []

  // Create up to 3 outfits using available wardrobe items
  const shuffledWardrobe = [...wardrobe].sort(() => Math.random() - 0.5)

  for (let i = 0; i < Math.min(3, Math.floor(wardrobe.length / 2)); i++) {
    const startIndex = i * 2
    const outfitItems = shuffledWardrobe.slice(startIndex, startIndex + Math.min(3, wardrobe.length - startIndex))

    if (outfitItems.length > 0) {
      mockOutfits.push({
        id: `mock-${Date.now()}-${i}`,
        name: `Outfit ${i + 1} para ${occasion}`,
        items: outfitItems,
        justification: `Esta combinación funciona bien para ${occasion.toLowerCase()}. ${description ? `Considerando tu preferencia: ${description}` : ""}`,
        occasion,
      })
    }
  }

  return mockOutfits
}
