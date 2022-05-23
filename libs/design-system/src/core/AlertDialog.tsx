import React from 'react'
import { styled } from '../config/theme'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import {
  dialogContentStyles,
  dialogDescriptionCss,
  dialogOverlayStyles,
  dialogTitleCss,
} from './Dialog'
import { Box } from './Box'
import { Flex } from './Flex'

const AlertDialogOverlay = styled(
  AlertDialogPrimitive.Overlay,
  dialogOverlayStyles
)

const StyledAlertDialogContent = styled(
  AlertDialogPrimitive.Content,
  dialogContentStyles
)

const AlertDialogPortal = AlertDialogPrimitive.Portal
const AlertDialogTitle = styled(AlertDialogPrimitive.Title, dialogTitleCss)
const AlertDialogDescription = styled(
  AlertDialogPrimitive.Description,
  dialogDescriptionCss
)
const AlertDialogAction = AlertDialogPrimitive.Action
const AlertDialogCancel = AlertDialogPrimitive.Cancel

type DialogControlsProps = {
  children: React.ReactNode
  separator?: boolean
}

function DialogControls({ children, separator = true }: DialogControlsProps) {
  return (
    <Box
      css={{
        padding: '$1 0',
        margin: '0 $2',
        backgroundColor: '$loContrast',
        borderTop: separator ? '1px solid $brandGray3' : 'none',
      }}
    >
      {children}
    </Box>
  )
}

type AlertDialogContentProps = AlertDialogPrimitive.AlertDialogContentProps & {
  title: React.ReactNode
  description: React.ReactNode
  action: React.ReactNode
  cancel: React.ReactNode
}

export function AlertDialogContent({
  children,
  title,
  description,
  action,
  cancel,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <StyledAlertDialogContent {...props}>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <Box css={{ padding: '0 $2 $2' }}>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {children}
        </Box>
        <DialogControls separator>
          <Flex gap="1" justify="end">
            <AlertDialogCancel asChild>{cancel}</AlertDialogCancel>
            <AlertDialogAction asChild>{action}</AlertDialogAction>
          </Flex>
        </DialogControls>
      </StyledAlertDialogContent>
    </AlertDialogPortal>
  )
}

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
