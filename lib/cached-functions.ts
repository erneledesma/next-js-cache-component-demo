"use server"

import { cacheLife } from "next/cache"

export async function getRecentPosts() {
  "use cache"
  cacheLife("minutes") // Cache por 5 minutos

  console.log("[v0] 📝 getRecentPosts ejecutándose - generando datos...")

  // Simular llamada a base de datos
  await new Promise((resolve) => setTimeout(resolve, 100))

  const fetchedAt = new Date().toLocaleTimeString("es-ES")
  console.log("[v0] ⏰ Posts generados a las:", fetchedAt)

  return [
    { id: 1, title: "Introducción a Next.js 16", date: "2025-10-28", fetchedAt },
    { id: 2, title: "Cache Components explicado", date: "2025-10-27", fetchedAt },
    { id: 3, title: "Mejores prácticas de caching", date: "2025-10-26", fetchedAt },
  ]
}

export async function getPopularPosts() {
  "use cache"
  cacheLife("hours") // Cache por 1 hora

  console.log("[v0] 🔥 getPopularPosts ejecutándose - generando datos...")

  // Simular llamada a base de datos
  await new Promise((resolve) => setTimeout(resolve, 100))

  const fetchedAt = new Date().toLocaleTimeString("es-ES")
  console.log("[v0] ⏰ Posts populares generados a las:", fetchedAt)

  return [
    { id: 1, title: "Guía completa de React Server Components", views: 15420, fetchedAt },
    { id: 2, title: "Optimización de rendimiento en Next.js", views: 12350, fetchedAt },
    { id: 3, title: "TypeScript avanzado para React", views: 9870, fetchedAt },
  ]
}

export async function getUserProfile(userId: string) {
  "use cache"
  cacheLife("days") // Cache por 1 día

  console.log("[v0] 👤 getUserProfile ejecutándose para userId:", userId)

  // Simular llamada a base de datos
  await new Promise((resolve) => setTimeout(resolve, 100))

  const fetchedAt = new Date().toLocaleTimeString("es-ES")
  console.log("[v0] ⏰ Perfil generado a las:", fetchedAt)

  return {
    id: userId,
    name: "Juan Pérez",
    email: "juan@example.com",
    memberSince: "2023-01-15",
    fetchedAt,
  }
}
