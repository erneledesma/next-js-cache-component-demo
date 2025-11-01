import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Box } from "lucide-react"
import Link from "next/link"
import { CachedWeather } from "@/components/cached-weather"
import { CachedStats } from "@/components/cached-stats"

export default function ComponentLevelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Box className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-balance">Component-Level Cache</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Esta página NO está cacheada, pero los componentes individuales sí lo están con diferentes duraciones.
          </p>

          <div className="grid gap-6 mb-6">
            <CachedWeather city="Madrid" />
            <CachedStats />
          </div>

          <Card className="bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle className="text-slate-50">Código del Componente</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto">
                <code>{`export async function CachedWeather({ city }) {
  'use cache'
  cacheLife('minutes') // Cache por 1 minuto
  
  const weather = await fetchWeather(city)
  
  return <div>{/* mostrar clima */}</div>
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">📝 Explicación:</h3>
            <ul className="space-y-2 text-sm text-purple-900">
              <li>• Cada componente puede tener su propia estrategia de cache</li>
              <li>• El componente Weather se cachea por 1 minuto</li>
              <li>• El componente Stats se cachea por 5 minutos</li>
              <li>• La página se regenera en cada request, pero los componentes usan cache</li>
              <li>• Ideal para páginas con secciones que cambian a diferentes velocidades</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
