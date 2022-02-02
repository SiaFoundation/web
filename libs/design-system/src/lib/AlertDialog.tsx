import React from 'react'
import { styled } from '../config/theme'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import {
  dialogContentStyles,
  dialogDescriptionCss,
  dialogOverlayStyles,
  dialogTitleCss,
} from './Dialog'

type AlertDialogProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Root
> & {
  children: React.ReactNode
}

export const AlertDialogOverlay = styled(
  AlertDialogPrimitive.Overlay,
  dialogOverlayStyles
)

export function AlertDialog({ children, ...props }: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root {...props}>{children}</AlertDialogPrimitive.Root>
  )
}

export const AlertDialogContent = styled(
  AlertDialogPrimitive.Content,
  dialogContentStyles
)

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal
export const AlertDialogTitle = styled(
  AlertDialogPrimitive.Title,
  dialogTitleCss
)
export const AlertDialogDescription = styled(
  AlertDialogPrimitive.Description,
  dialogDescriptionCss
)
export const AlertDialogAction = AlertDialogPrimitive.Action
export const AlertDialogCancel = AlertDialogPrimitive.Cancel
