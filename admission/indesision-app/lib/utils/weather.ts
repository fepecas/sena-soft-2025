export interface WeatherData {
  temperature: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  city: string
}

export async function getWeather(city: string): Promise<WeatherData | null> {
  try {
    const apiKey = "e3af4410eea94a79ec8e5d78de4fb674"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`

    console.log("[v0] Weather API URL:", url)

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Weather API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      throw new Error(`Weather API request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()

    console.log("[v0] Weather API Response:", data)

    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      city: data.name,
    }
  } catch (error) {
    console.error("[v0] Error fetching weather:", error)
    console.error("[v0] City parameter:", city)
    return null
  }
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
