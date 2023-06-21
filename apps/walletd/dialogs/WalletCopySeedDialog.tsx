/* eslint-disable react/no-unescaped-entities */
import {
  copyToClipboard,
  Dialog,
  FieldGroup,
  FormSubmitButton,
  TextArea,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useDialogFormHelpers } from '../hooks/useDialogFormHelpers'
import { SeedLayout } from './SeedLayout'

const defaultValues = {
  hasCopied: false,
}

type Props = {
  id: string
  params?: {
    seed: string
  }
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletCopySeedDialog({
  id,
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { seed } = params || {}
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { reset, handleOpenChange } = useDialogFormHelpers({
    form,
    defaultValues,
    onOpenChange,
  })

  form.register('hasCopied', {
    validate: {
      copied: (val) => val || 'Copy seed to continue',
    },
  })

  const copySeed = useCallback(() => {
    copyToClipboard(seed, 'seed')
    form.setValue('hasCopied', true)
  }, [seed, form])

  const { openDialog } = useDialog()
  const onSubmit = useCallback(() => {
    openDialog('walletGenerateAddresses', {
      id,
      params: { seed },
    })
    reset()
  }, [openDialog, id, seed, reset])

  return (
    <Dialog
      title={`Wallet ${id}: copy seed`}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="red" size="medium">
            Continue
          </FormSubmitButton>
        </div>
      }
    >
      <SeedLayout
        copySeed={copySeed}
        icon={<SeedIcon />}
        description={
          <>
            This is your Sia seed. Please copy and store your seed somewhere
            safe, because there's no way to recover it. Your seed is used to
            unlock your wallet and can recover your Siacoins and uploaded files.
          </>
        }
      >
        <div className="py-2">
          <FieldGroup form={form} title="Seed" name="hasCopied">
            <TextArea
              value={seed}
              readOnly
              onClick={(e) => {
                e.currentTarget.select()
                copySeed()
              }}
            />
          </FieldGroup>
        </div>
      </SeedLayout>
    </Dialog>
  )
}

function SeedIcon() {
  return (
    <svg
      height={50}
      width={50}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>key</title>
      <g fill="#32d66a" stroke="#32d66a" strokeLinecap="square" strokeWidth="2">
        <path
          d="M25,1,12.784,13.154a8.572,8.572,0,1,0,6.061,6.061L21,17V13h4V9h3l3-3V1Z"
          fill="none"
          stroke="#32d66a"
        />
        <circle cx="10" cy="22" fill="none" r="3" />
      </g>
    </svg>
  )
}
