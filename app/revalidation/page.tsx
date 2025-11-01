import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { getProducts } from "@/lib/products"
import { RevalidateButton } from "@/components/revalidate-button"
import { UpdateButton } from "@/components/update-button"

export default async function RevalidationPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-balance">Revalidation APIs</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Nuevas APIs para controlar la revalidación del cache de forma precisa.
          </p>

          <Card className="mb-6 border-orange-200">
            <CardHeader>
              <CardTitle>Productos (Cacheados)</CardTitle>
              <CardDescription>Datos cacheados con tag "products" - Cache: 1 hora</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="font-bold text-orange-600">${product.price}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mb-4">Última actualización: {products[0]?.updatedAt}</p>

              <div className="flex gap-3">
                <RevalidateButton />
                <UpdateButton />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 mb-6">
            <Card className="bg-slate-900 text-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-50">revalidateTag()</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto mb-4">
                  <code>{`'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateProducts() {
  // Requiere cacheLife profile para SWR
  revalidateTag('products', 'max')
  
  // O con tiempo personalizado
  revalidateTag('products', { revalidate: 3600 })
}`}</code>
                </pre>
                <p className="text-sm text-slate-300">
                  Revalida el cache con comportamiento stale-while-revalidate. Los usuarios ven datos antiguos mientras
                  se actualizan en segundo plano.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-50">revalidatePath()</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto mb-4">
                  <code>{`'use server'

import { revalidatePath } from 'next/cache'

export async function updateProduct(id: string) {
  await database.products.update(id, data)
  
  // Revalida una ruta específica
  revalidatePath('/products')
  
  // O revalida todo el layout
  revalidatePath('/products', 'layout')
}`}</code>
                </pre>
                <p className="text-sm text-slate-300">
                  Revalida todas las entradas de cache asociadas con una ruta específica. Útil para invalidar páginas
                  completas después de mutaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-50">cacheLife Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto mb-4">
                  <code>{`// next.config.ts
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    frequent: {
      stale: 60,        // 1 minuto
      revalidate: 300,  // 5 minutos
      expire: 3600,     // 1 hora
    },
  },
}

// En tu componente
'use cache'
import { cacheLife } from 'next/cache'

export async function getData() {
  cacheLife('frequent')
  return await fetch('/api/data')
}`}</code>
                </pre>
                <p className="text-sm text-slate-300">
                  Define perfiles de cache personalizados para diferentes tipos de datos. Controla cuándo los datos se
                  consideran stale, cuándo revalidar, y cuándo expiran.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">Diferencias Clave en Next.js 16:</h3>
            <ul className="space-y-2 text-sm text-orange-900">
              <li>
                • <strong>revalidateTag():</strong> Ahora requiere un cacheLife profile como segundo argumento
              </li>
              <li>
                • <strong>revalidatePath():</strong> Revalida rutas completas, útil para páginas dinámicas
              </li>
              <li>
                • <strong>cacheLife():</strong> Define perfiles de cache personalizados con stale/revalidate/expire
              </li>
              <li>• Usa perfiles predefinidos: 'seconds', 'minutes', 'hours', 'days', 'weeks', 'max'</li>
              <li>• El profile 'max' proporciona la revalidación más agresiva para cambios inmediatos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
