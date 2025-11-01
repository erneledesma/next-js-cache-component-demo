import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Code2 } from "lucide-react"
import Link from "next/link"
import { getRecentPosts, getPopularPosts, getUserProfile } from "@/lib/cached-functions"

export default async function FunctionLevelPage() {
  // Cada función tiene su propia estrategia de cache
  const recentPosts = await getRecentPosts()
  const popularPosts = await getPopularPosts()
  const userProfile = await getUserProfile("user-123")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-balance">Function-Level Cache</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Funciones individuales con diferentes perfiles de cache según sus necesidades.
          </p>

          <div className="grid gap-6 mb-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>Posts Recientes</CardTitle>
                <CardDescription>Cache: 5 minutos (perfil 'minutes')</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentPosts.map((post) => (
                    <li key={post.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>{post.title}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">Obtenido: {recentPosts[0]?.fetchedAt}</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>Posts Populares</CardTitle>
                <CardDescription>Cache: 1 hora (perfil 'hours')</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {popularPosts.map((post) => (
                    <li key={post.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>{post.title}</span>
                      <span className="text-xs text-muted-foreground">{post.views} vistas</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">Obtenido: {popularPosts[0]?.fetchedAt}</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>Perfil de Usuario</CardTitle>
                <CardDescription>Cache: 1 día (perfil 'days')</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre:</span>
                  <span className="font-medium">{userProfile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{userProfile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Miembro desde:</span>
                  <span className="font-medium">{userProfile.memberSince}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4 pt-2 border-t">Obtenido: {userProfile.fetchedAt}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle className="text-slate-50">Código de las Funciones</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto">
                <code>{`export async function getRecentPosts() {
  'use cache'
  cacheLife('minutes') // 5 minutos
  
  return await fetchRecentPosts()
}

export async function getPopularPosts() {
  'use cache'
  cacheLife('hours') // 1 hora
  
  return await fetchPopularPosts()
}

export async function getUserProfile(userId: string) {
  'use cache'
  cacheLife('days') // 1 día
  
  return await fetchUserProfile(userId)
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">📝 Explicación:</h3>
            <ul className="space-y-2 text-sm text-green-900">
              <li>• Cada función puede tener su propio perfil de cache</li>
              <li>• Posts recientes cambian frecuentemente → cache corto (5 min)</li>
              <li>• Posts populares son más estables → cache medio (1 hora)</li>
              <li>• Perfiles de usuario raramente cambian → cache largo (1 día)</li>
              <li>• Optimiza el rendimiento según la naturaleza de cada dato</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
