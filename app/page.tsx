"use cache"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Database, Layers, RefreshCw, Globe } from "lucide-react"

export default async function HomePage() {
  const timestamp = new Date().toLocaleString("es-ES")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-auto mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-balance bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js 16 Cache Components
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Demo de las nuevas características de caching con la directiva "use cache"
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Página cacheada generada: {timestamp}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-blue-600" />
                <CardTitle>File-Level Cache</CardTitle>
              </div>
              <CardDescription>Cachea páginas completas con "use cache" al inicio del archivo</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/file-level"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver ejemplo →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-purple-600" />
                <CardTitle>Component-Level Cache</CardTitle>
              </div>
              <CardDescription>Cachea componentes individuales de forma granular</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/component-level"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                Ver ejemplo →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-green-600" />
                <CardTitle>Function-Level Cache</CardTitle>
              </div>
              <CardDescription>Cachea funciones específicas con diferentes perfiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/function-level"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Ver ejemplo →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-orange-600" />
                <CardTitle>Revalidation APIs</CardTitle>
              </div>
              <CardDescription>revalidateTag, updateTag y refresh en acción</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/revalidation"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                Ver ejemplo →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-cyan-600" />
                <CardTitle>Cache con Datos Externos</CardTitle>
              </div>
              <CardDescription>
                Ejemplo con API simulada que demuestra el cache real (funciona en desarrollo)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/external-data"
                className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Ver ejemplo →
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Conceptos Clave</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-900">
            <div>
              <strong>• "use cache":</strong> Directiva para marcar rutas, componentes o funciones como cacheables
            </div>
            <div>
              <strong>• cacheLife():</strong> Define el tiempo de vida del cache con perfiles predefinidos o
              personalizados
            </div>
            <div>
              <strong>• revalidateTag():</strong> Revalida cache con comportamiento stale-while-revalidate
            </div>
            <div>
              <strong>• updateTag():</strong> Actualiza cache con semántica read-your-writes (solo Server Actions)
            </div>
            <div>
              <strong>• refresh():</strong> Refresca solo datos no cacheados
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-amber-50 border-amber-300">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              ⚠️ Importante: Desarrollo vs Producción
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-amber-900">
            <p>
              <strong>En modo desarrollo (npm run dev):</strong> El cache puede no funcionar como esperas porque Next.js
              invalida el cache automáticamente cuando detecta cambios en el código fuente (hot-reload).
            </p>
            <p>
              <strong>En producción (npm run build && npm start):</strong> El cache funciona correctamente y respeta los
              tiempos de expiración configurados.
            </p>
            <p className="pt-2 border-t border-amber-300">
              💡 <strong>Tip:</strong> Para probar el cache correctamente, construye la aplicación en modo producción o
              usa datos externos (APIs) en lugar de datos estáticos en archivos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
