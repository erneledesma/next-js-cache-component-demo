"use server"

import { cacheLife, unstable_cacheTag as cacheTag } from "next/cache"

export async function getProducts() {
  "use cache"
  cacheLife("hours")
  cacheTag("products")

  // Simular llamada a base de datos
  await new Promise((resolve) => setTimeout(resolve, 10))

  return [
    {
      id: 1,
      name: "Laptop Pro",
      category: "Electrónica",
      price: 125,
      updatedAt: new Date().toLocaleTimeString("es-ES"),
    },
    {
      id: 2,
      name: "Mouse Inalámbrico",
      category: "Accesorios",
      price: 45,
      updatedAt: new Date().toLocaleTimeString("es-ES"),
    },
    {
      id: 3,
      name: "Teclado Mecánico",
      category: "Accesorios",
      price: 89,
      updatedAt: new Date().toLocaleTimeString("es-ES"),
    },
  ]
}
