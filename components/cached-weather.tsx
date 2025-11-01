"use cache"

import { cacheLife } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud } from "lucide-react"

async function fetchWeather(city: string) {
  // Simular llamada a API
  await new Promise((resolve) => setTimeout(resolve, 100))
  return {
    temperature: Math.floor(Math.random() * 15) + 15,
    condition: ["Soleado", "Nublado", "Lluvioso"][Math.floor(Math.random() * 3)],
    humidity: Math.floor(Math.random() * 40) + 40,
    fetchedAt: new Date().toISOString(),
  }
}

export async function CachedWeather({ city }: { city: string }) {
  cacheLife("minutes") // Cache por 1 minuto

  const weather = await fetchWeather(city)

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-purple-600" />
            <CardTitle>Clima en {city}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">Cache: 1 minuto</span>
        </div>
        <CardDescription>Componente cacheado independientemente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Temperatura:</span>
          <span className="font-medium">{weather.temperature}°C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Condición:</span>
          <span className="font-medium">{weather.condition}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Humedad:</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Obtenido: {new Date(weather.fetchedAt).toLocaleTimeString("es-ES")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
