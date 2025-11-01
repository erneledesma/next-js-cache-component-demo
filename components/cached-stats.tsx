"use cache"

import { cacheLife } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

async function fetchStats() {
  // Simular llamada a API
  await new Promise((resolve) => setTimeout(resolve, 100))
  return {
    users: Math.floor(Math.random() * 1000) + 5000,
    sessions: Math.floor(Math.random() * 500) + 1000,
    pageViews: Math.floor(Math.random() * 5000) + 10000,
    fetchedAt: new Date().toISOString(),
  }
}

export async function CachedStats() {
  cacheLife("hours") // Cache por 1 hora

  const stats = await fetchStats()

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <CardTitle>Estadísticas</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">Cache: 1 hora</span>
        </div>
        <CardDescription>Datos cacheados por más tiempo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Usuarios:</span>
          <span className="font-medium">{stats.users.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sesiones:</span>
          <span className="font-medium">{stats.sessions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Vistas:</span>
          <span className="font-medium">{stats.pageViews.toLocaleString()}</span>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Obtenido: {new Date(stats.fetchedAt).toLocaleTimeString("es-ES")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
