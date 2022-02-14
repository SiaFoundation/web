import * as clipboard from 'clipboard-polyfill/text'
import { ToastOptions, triggerToast } from './toast'

export const copyToClipboard = (text: string, entity: string) => {
  triggerToast(`Copied ${entity} to clipboard`)
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
