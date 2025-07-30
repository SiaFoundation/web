import { writeText, write } from 'clipboard-polyfill'
import { ToastOptions, triggerToast } from './toast'
import { Copy16 } from '@siafoundation/react-icons'

export const copyToClipboard = (text: string, entity?: string) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast({ title: message, body: text, icon: <Copy16 /> })
  writeText(text)
}

export const copyImageToClipboard = (
  image: Blob,
  type: string,
  entity?: string,
) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast({ title: message, icon: <Copy16 /> })
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
  triggerToast({ title, body, icon: icon || <Copy16 />, options })
  writeText(text)
}
