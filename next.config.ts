import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Habilitar Cache Components
  cacheComponents: true,

  // Perfiles de cache personalizados (opcional)
  cacheLife: {
    // Perfil personalizado para contenido frecuente
    frequent: {
      stale: 60, // 1 minuto en el cliente
      revalidate: 300, // 5 minutos en el servidor
      expire: 60, // 1 hora máximo
    },
    // Perfil para contenido casi estático
    nearStatic: {
      stale: 3600, // 1 hora en el cliente
      revalidate: 86400, // 1 día en el servidor
      expire: 604800, // 1 semana máximo
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
