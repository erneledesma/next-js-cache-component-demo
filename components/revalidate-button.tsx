"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { revalidateProductsAction } from "@/app/actions"
import { useState } from "react"

export function RevalidateButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRevalidate = async () => {
    setIsLoading(true)
    await revalidateProductsAction()
    setIsLoading(false)
  }

  return (
    <Button onClick={handleRevalidate} disabled={isLoading} variant="outline" className="gap-2 bg-transparent">
      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      revalidateTag()
    </Button>
  )
}
