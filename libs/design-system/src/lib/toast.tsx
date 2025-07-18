'use client'

import { useTheme } from 'next-themes'
import { ExternalToast, Toaster as Sonner, ToasterProps, toast } from 'sonner'
import { CheckmarkOutline16, CloseOutline16 } from '@siafoundation/react-icons'

export type ToastOptions = ExternalToast

export function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme } = useTheme()
  return (
    <Sonner
      position="top-center"
      closeButton
      theme={resolvedTheme as ToasterProps['theme']}
      className="z-30 toaster group"
      {...props}
    />
  )
}

export type ToastParams = {
  title: React.ReactNode
  body?: React.ReactNode
  icon?: React.ReactNode
  options?: ExternalToast
}

export const triggerToast = ({
  title,
  body,
  icon,
  options = {},
}: ToastParams) => {
  toast(title, {
    classNames: {
      toast: 'font-sans',
      description: 'max-h-[400px] overflow-hidden',
    },
    icon,
    description: body,
    ...options,
  })
}

export function triggerSuccessToast({ title, body, options }: ToastParams) {
  triggerToast({
    title,
    body,
    icon: <CheckmarkOutline16 className="text-green-600" />,
    options,
  })
}

export function triggerErrorToast({ title, body, options }: ToastParams) {
  triggerToast({
    title,
    body,
    icon: <CloseOutline16 className="text-red-600" />,
    options,
  })
}
