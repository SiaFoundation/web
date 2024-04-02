import React from 'react'
import { writeText, write } from 'clipboard-polyfill'
import { ToastOptions, triggerToast } from './toast'
import { Copy24 } from '@siafoundation/react-icons'

export const copyToClipboard = (text: string, entity?: string) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast({ title: message, icon: <Copy24 /> })
  writeText(text)
}

export const copyImageToClipboard = (
  image: Blob,
  type: string,
  entity?: string
) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast({ title: message, icon: <Copy24 /> })
  write([new ClipboardItem({ [type]: image })])
}

export const copyToClipboardCustom = ({
  text,
  title,
  body,
  icon,
  options,
}: {
  text: string
  title: React.ReactNode
  body: React.ReactNode
  icon?: React.ReactNode
  options?: ToastOptions
}) => {
  triggerToast({ title, body, icon: icon || <Copy24 />, options })
  writeText(text)
}
