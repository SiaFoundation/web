import { CheckmarkOutline16, CloseOutline16 } from '../icons/carbon'
import toast, {
  Renderable,
  Toaster as RToaster,
  ToastOptions,
} from 'react-hot-toast'
import { cx } from 'class-variance-authority'
import { panelStyles } from '../core/Panel'
import { rootClasses } from '../config/css'
import React from 'react'

export type { ToastOptions }

export const triggerToast = (text: string, options: ToastOptions = {}) => {
  toast(
    text.length > 200 ? `${text.slice(0, 200)}` : text,
    buildToastOptions(options)
  )
}

export const triggerToastNode = (
  text: React.ReactNode,
  options: ToastOptions = {}
) => {
  toast(text as Renderable, buildToastOptions(options))
}

export const triggerSuccessToast = (
  text: string,
  options: ToastOptions = {}
) => {
  toast.success(
    text.length > 200 ? `${text.slice(0, 200)}...` : text,
    buildToastOptions(options)
  )
}

export const triggerErrorToast = (text: string, options: ToastOptions = {}) => {
  toast.error(
    text.length > 200 ? `${text.slice(0, 200)}...` : text,
    buildToastOptions(options)
  )
}

export function buildToastOptions(options?: ToastOptions): ToastOptions {
  return {
    position: 'top-center',
    duration: 5_000,
    className: cx(
      rootClasses,
      panelStyles(),
      'font-sans font-normal',
      'text-gray-1100 dark:text-white',
      'max-w-[800px]',
      options?.className
    ),
    success: {
      icon: (
        <div>
          <CheckmarkOutline16 className="w-5 text-green-600" />
        </div>
      ),
    },
    error: {
      icon: (
        <div>
          <CloseOutline16 className="w-5 text-red-600" />
        </div>
      ),
    },
    ...options,
  } as ToastOptions
}

export function Toaster() {
  return <RToaster toastOptions={buildToastOptions()} />
}
