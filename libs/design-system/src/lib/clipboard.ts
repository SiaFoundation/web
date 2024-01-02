import React from 'react'
import { writeText } from 'clipboard-polyfill'
import { ToastOptions, triggerToast, triggerToastNode } from './toast'

export const copyToClipboard = (text: string, entity?: string) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast(message)
  writeText(text)
}

export const copyToClipboardCustom = (
  text: string,
  message: React.ReactNode,
  options?: ToastOptions
) => {
  triggerToastNode(message, options)
  writeText(text)
}
