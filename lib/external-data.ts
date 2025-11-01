"use server"

import { cacheLife, unstable_cacheTag as cacheTag } from "next/cache"

// Simular una API externa que devuelve datos
async function fetchFromExternalAPI() {
  console.log("[v0] 🔄 fetchFromExternalAPI ejecutándose - esto indica que NO hay cache")

  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 100))

  const timestamp = new Date().toLocaleString("es-ES")
  console.log("[v0] ⏰ Timestamp generado:", timestamp)

  // Simular respuesta de API con datos que cambian
  return {
    products: [
      {
        id: 1,
        name: "Laptop Gaming",
        description: "Laptop de alto rendimiento para gaming",
        price: Math.floor(Math.random() * 500) + 1000, // Precio aleatorio
        stock: Math.floor(Math.random() * 50) + 10,
        category: "Electrónica",
      },
      {
        id: 2,
        name: "Monitor 4K",
        description: "Monitor ultra HD de 27 pulgadas",
        price: Math.floor(Math.random() * 300) + 600,
        stock: Math.floor(Math.random() * 30) + 5,
        category: "Electrónica",
      },
      {
        id: 3,
        name: "Teclado RGB",
        description: "Teclado mecánico con iluminación RGB",
        price: Math.floor(Math.random() * 100) + 80,
        stock: Math.floor(Math.random() * 100) + 20,
        category: "Accesorios",
      },
      {
        id: 4,
        name: "Mouse Gamer",
        description: "Mouse óptico de alta precisión",
        price: Math.floor(Math.random() * 80) + 40,
        stock: Math.floor(Math.random() * 80) + 15,
        category: "Accesorios",
      },
    ],
    timestamp,
  }
}

export async function getExternalProducts() {
  "use cache"
  cacheLife("hours") // Cache por 1 hora
  cacheTag("external-products")

  console.log("[v0] 📦 getExternalProducts llamada - verificando cache...")

  // Obtener datos de la "API externa"
  const data = await fetchFromExternalAPI()

  console.log("[v0] ✅ Datos obtenidos, retornando productos")

  return data.products.map((product) => ({
    ...product,
    fetchedAt: data.timestamp,
  }))
}
