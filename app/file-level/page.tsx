"use cache"

import { cacheLife } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileCode } from "lucide-react"
import Link from "next/link"

// Simular una llamada a API
async function getPageData() {
  // En producción, esto sería una llamada real a una API
  await new Promise((resolve) => setTimeout(resolve, 100))
  return {
    title: "Página con File-Level Cache",
    generatedAt: new Date().toISOString(),
    views: Math.floor(Math.random() * 1),
  }
}

export default async function FileLevelPage() {
  // Aplicar perfil de cache 'hours' (1 hora)
  cacheLife("hours")

  const data = await getPageData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileCode className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-balance">File-Level Cache</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Datos Cacheados</CardTitle>
              <CardDescription>Esta página completa está cacheada por 1 hora</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Título:</p>
                <p className="font-medium">{data.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Generado en:</p>
                <p className="font-mono text-sm">{new Date(data.generatedAt).toLocaleString("es-ES")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vistas:</p>
                <p className="font-medium">{data.views}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle className="text-slate-50">Código</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto">
                <code>{`'use cache'

import { cacheLife } from 'next/cache'

export default async function FileLevelPage() {
  // Aplicar perfil de cache 'hours'
  cacheLife('hours')
  
  const data = await getPageData()
  
  return <div>{/* contenido */}</div>
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📝 Explicación:</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>
                • La directiva <code className="bg-blue-100 px-1 rounded">'use cache'</code> al inicio del archivo
                cachea toda la página
              </li>
              <li>
                • <code className="bg-blue-100 px-1 rounded">cacheLife('hours')</code> define que el cache dura 1 hora
              </li>
              <li>• Recarga la página varias veces y verás que los datos no cambian</li>
              <li>• Perfiles disponibles: 'seconds', 'minutes', 'hours', 'days', 'weeks', 'max'</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
