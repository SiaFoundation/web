import React from 'react'
import { ToastOptions, triggerToast, triggerToastNode } from './toast'

export const copyToClipboard = (text: string, entity?: string) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast(message)
  navigator.clipboard.writeText(text)
}

export const copyToClipboardCustom = (
  text: string,
  message: React.ReactNode,
  options?: ToastOptions
) => {
  triggerToastNode(message, options)
  navigator.clipboard.writeText(text)
}
