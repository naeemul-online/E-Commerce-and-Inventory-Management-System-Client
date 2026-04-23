"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

type CopyIdButtonProps = {
  id: string
  label?: string
}

const CopyIdButton = ({ id, label = "Copy id" }: CopyIdButtonProps) => {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)
      toast.success("ID copied to clipboard")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Unable to copy")
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      aria-label={label}
      className="h-7 gap-1 px-2 text-xs"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span className="font-mono">{id.slice(0, 8)}…</span>
    </Button>
  )
}

export default CopyIdButton
