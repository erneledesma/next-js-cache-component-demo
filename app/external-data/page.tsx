import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Globe, AlertCircle } from "lucide-react"
import Link from "next/link"
import { getExternalProducts } from "@/lib/external-data"

export default async function ExternalDataPage() {
  const products = await getExternalProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-cyan-600" />
            <h1 className="text-4xl font-bold text-balance">Cache con Datos Externos</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Ejemplo con datos externos simulados (API) para demostrar el cache real.
          </p>

          <Card className="mb-6 bg-amber-50 border-amber-200">
            <CardHeader>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <CardTitle className="text-amber-900">Importante: Comportamiento del Cache</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-amber-900">
              <p>
                <strong>En modo desarrollo:</strong> Next.js puede invalidar el cache frecuentemente debido a hot-reload
                y cambios en el código. El cache funciona mejor en producción.
              </p>
              <p>
                <strong>Para ver el cache funcionando:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Abre la consola del navegador (F12)</li>
                <li>Busca los logs que empiezan con [v0]</li>
                <li>Refresca la página varias veces</li>
                <li>
                  Si ves el log "fetchFromExternalAPI ejecutándose", significa que NO hay cache y se están generando
                  datos nuevos
                </li>
                <li>Si NO ves ese log, el cache está funcionando</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-cyan-50 border-cyan-200">
            <CardHeader>
              <CardTitle className="text-cyan-900">Cómo Probar el Cache</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-cyan-900">
              <p>
                <strong>1.</strong> Observa el timestamp de "Datos obtenidos" y los precios abajo
              </p>
              <p>
                <strong>2.</strong> Refresca la página (F5) varias veces
              </p>
              <p>
                <strong>3.</strong> Si el cache funciona: timestamp y precios NO cambian
              </p>
              <p>
                <strong>4.</strong> Si el cache NO funciona: verás nuevos precios aleatorios cada vez
              </p>
              <p className="pt-2 border-t border-cyan-300">
                💡 Los precios son aleatorios, así que si cambian, significa que la función se ejecutó de nuevo (sin
                cache).
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyan-200">
            <CardHeader>
              <CardTitle>Productos desde API Externa</CardTitle>
              <CardDescription>Cache: 1 hora (cacheLife: hours)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="p-4 bg-cyan-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <span className="text-lg font-bold text-cyan-600">${product.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
                      <span>Stock: {product.stock} unidades</span>
                      <span>Categoría: {product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Datos obtenidos:</strong> {products[0]?.fetchedAt}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Si este timestamp cambia al refrescar, el cache NO está funcionando
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle className="text-slate-50">Código de la Función</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto">
                <code>{`export async function getExternalProducts() {
  'use cache'
  cacheLife('hours') // Cache por 1 hora
  cacheTag('external-products')

  // Simular llamada a API externa
  const data = await fetchFromExternalAPI()
  
  return data.products.map(product => ({
    ...product,
    fetchedAt: data.timestamp
  }))
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Verificando el Cache en la Consola:</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>
                <strong>Cache funcionando:</strong> Solo verás los logs [v0] la primera vez que cargas la página
              </li>
              <li>
                <strong>Sin cache:</strong> Verás los logs [v0] cada vez que refrescas
              </li>
              <li>
                <strong>Nota:</strong> En desarrollo, el cache puede ser inconsistente debido a hot-reload
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
