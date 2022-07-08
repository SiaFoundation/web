import * as clipboard from 'clipboard-polyfill/text'
import { ToastOptions, triggerToast } from './toast'

export const copyToClipboard = (text: string, entity?: string) => {
  const message = entity
    ? `Copied ${entity} to clipboard`
    : 'Copied to clipboard'
  triggerToast(message)
  clipboard.writeText(text)
}

export const copyToClipboardCustom = (
  text: string,
  message: string,
  options: ToastOptions
) => {
  triggerToast(message, options)
  clipboard.writeText(text)
}
