'use client'

import { CheckmarkOutline16, CloseOutline16 } from '@siafoundation/react-icons'
import toast, {
  Renderable,
  Toaster as RToaster,
  ToastOptions,
} from 'react-hot-toast'
import { cx } from 'class-variance-authority'
import { panelStyles } from '../core/Panel'
import React from 'react'
import { Text } from '../core/Text'
import { rootFontClasses } from '@siafoundation/fonts'

export type { ToastOptions }

export const triggerToast = (
  text: React.ReactNode,
  options: ToastOptions = {}
) => {
  toast(
    <Text wrapEllipsis>
      {typeof text === 'string' && text.length > 200
        ? `${text.slice(0, 200)}`
        : text}
    </Text>,
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
  text: React.ReactNode,
  options: ToastOptions = {}
) => {
  toast.success(
    <Text wrapEllipsis>
      {typeof text === 'string' && text.length > 200
        ? `${text.slice(0, 200)}...`
        : text}
    </Text>,
    buildToastOptions(options)
  )
}

export const triggerErrorToast = (
  text: React.ReactNode,
  options: ToastOptions = {}
) => {
  toast.error(
    <Text wrapEllipsis>
      {typeof text === 'string' && text.length > 200
        ? `${text.slice(0, 200)}...`
        : text}
    </Text>,
    buildToastOptions(options)
  )
}

export function buildToastOptions({
  className,
  ...options
}: ToastOptions = {}): ToastOptions {
  return {
    position: 'top-center',
    duration: 6_000,
    className: cx(
      rootFontClasses,
      panelStyles(),
      'font-sans font-normal',
      'text-gray-1100 dark:text-white',
      'max-w-[800px] overflow-hidden text-ellipsis',
      '[&>div]:overflow-hidden',
      '[&>div]:flex-1',
      className
    ),
    success: {
      icon: (
        <div className="!flex-none w-5">
          <CheckmarkOutline16 className="w-5 text-green-600" />
        </div>
      ),
    },
    error: {
      icon: (
        <div className="!flex-none w-5">
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
