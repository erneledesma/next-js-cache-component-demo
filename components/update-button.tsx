"use client"

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { updateProductsAction } from "@/app/actions"
import { useState } from "react"

export function UpdateButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    setIsLoading(true)
    await updateProductsAction()
    setIsLoading(false)
  }

  return (
    <Button onClick={handleUpdate} disabled={isLoading} className="gap-2">
      <Zap className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`} />
      Actualizar Cache
    </Button>
  )
}
