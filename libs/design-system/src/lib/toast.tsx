'use client'

import {
  CheckmarkOutline16,
  CheckmarkOutline24,
  Close16,
  CloseOutline16,
  CloseOutline24,
} from '@siafoundation/react-icons'
import toast, { Toaster as RToaster, ToastOptions } from 'react-hot-toast'
import { cx } from 'class-variance-authority'
import { panelStyles } from '../core/Panel'
import React from 'react'
import { Text } from '../core/Text'
import { Button } from '../core/Button'
import { Tooltip } from '../core/Tooltip'
import { ScrollArea } from '../core/ScrollArea'

export type { ToastOptions }

function ToastLayout({
  icon,
  title,
  body,
  toastId,
}: {
  icon?: React.ReactNode
  title: React.ReactNode
  body: React.ReactNode
  toastId: string
}) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 pt-1.5 pb-1 px-1 overflow-hidden">
        {icon && (
          <Text className="flex items-center" color="subtle">
            {icon}
          </Text>
        )}
        <Tooltip content={title}>
          <Text ellipsis className="flex-1">
            {title}
          </Text>
        </Tooltip>
        <div className="flex items-center pl-1">
          <Button
            icon="hover"
            size="none"
            onClick={(e) => {
              toast.dismiss(toastId)
            }}
          >
            <Close16 />
          </Button>
        </div>
      </div>
      {body && (
        <div className="pb-1">
          <ScrollArea>
            <div className="max-w-sm px-1 max-h-20">
              <Text color="subtle" size="14">
                {body}
              </Text>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

type ToastParams = {
  title: React.ReactNode
  body?: React.ReactNode
  icon?: React.ReactNode
  options?: ToastOptions
}

export const triggerToast = ({
  title,
  body,
  icon,
  options = {},
}: ToastParams) => {
  toast(
    (t) => <ToastLayout toastId={t.id} title={title} body={body} icon={icon} />,
    buildToastOptions(options)
  )
}

export function triggerSuccessToast({ title, body, options }: ToastParams) {
  triggerToast({
    title,
    body,
    icon: <CheckmarkOutline24 className="text-green-600" />,
    options,
  })
}

export function triggerErrorToast({ title, body, options }: ToastParams) {
  triggerToast({
    title,
    body,
    icon: <CloseOutline24 className="text-red-600" />,
    options,
  })
}

export function buildToastOptions({
  className,
  ...options
}: ToastOptions = {}): ToastOptions {
  return {
    position: 'top-center',
    duration: 6_000,
    className: cx(
      panelStyles(),
      'overflow-hidden',
      '!max-w-[800px]',
      '[&>div]:overflow-hidden',
      '!p-0',
      'z-50',
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
  return (
    <RToaster
      toastOptions={buildToastOptions()}
      containerStyle={{
        zIndex: 20,
      }}
    />
  )
}
