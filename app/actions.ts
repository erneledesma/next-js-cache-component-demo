"use server"

import { revalidateTag, revalidatePath } from "next/cache"

export async function revalidateProductsAction() {
  revalidateTag("products", "max")
  revalidatePath("/revalidation")
}

export async function updateProductsAction() {
  // Simular actualización en base de datos
  await new Promise((resolve) => setTimeout(resolve, 500))

  // En Next.js 16, revalidateTag con 'max' profile proporciona revalidación inmediata
  revalidateTag("products", "max")
  revalidatePath("/revalidation")
}
