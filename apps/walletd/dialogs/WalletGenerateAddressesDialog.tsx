/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  Dialog,
  FieldNumber,
  FieldTextArea,
  FormSubmitButton,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddresses } from '../contexts/addresses'
import { useDialogFormHelpers } from '../hooks/useDialogFormHelpers'
import { getWalletdWasm } from '../lib/wasm'
import { SeedLayout } from './SeedLayout'
import * as bip39 from 'bip39'

type Props = {
  id: string
  params?: {
    mnemonic: string
  }
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues(lastIndex: number) {
  return {
    mnemonic: '',
    index: lastIndex,
    count: 1,
  }
}

function getFields(
  compareSeed?: string
): ConfigFields<ReturnType<typeof getDefaultValues>, never> {
  return {
    mnemonic: {
      type: 'text',
      title: 'Seed',
      placeholder: '',
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) =>
            bip39.validateMnemonic(value) ||
            'seed should be 12 word BIP39 mnemonic',
          match: (value) =>
            !compareSeed || value === compareSeed || 'seed does not match',
        },
      },
    },
    index: {
      type: 'number',
      title: 'Start index',
      decimalsLimit: 0,
      placeholder: '0',
      validation: {
        required: 'required',
      },
    },
    count: {
      type: 'number',
      title: 'Number of addresses',
      decimalsLimit: 0,
      placeholder: '10',
      validation: {
        required: 'required',
        max: 1000,
      },
    },
  }
}

export function WalletGenerateAddressesDialog({
  id: walletName,
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { mnemonic: compareSeed } = params || {}
  const { lastIndex } = useAddresses()
  const nextIndex = lastIndex + 1
  const defaultValues = getDefaultValues(nextIndex)
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  useEffect(() => {
    form.setValue('index', nextIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextIndex])

  const { handleOpenChange, resetAndClose } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const mnemonic = form.watch('mnemonic')
  const index = form.watch('index')
  const count = form.watch('count')

  const fields = getFields(compareSeed)

  const addressAdd = useWalletAddressAdd()
  const generateAddresses = useCallback(async () => {
    console.log(index, count)
    for (let i = index; i < index + count; i++) {
      const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
      const addrRes = getWalletdWasm().addressFromSeed(seed, i)
      if (addrRes.error) {
        triggerErrorToast('Error generating addresses.')
        return
      }
      const response = await addressAdd.put({
        params: {
          name: walletName,
          addr: addrRes.address,
        },
        payload: {
          index: i,
        },
      })
      if (response.error) {
        if (count === 1) {
          triggerErrorToast('Error saving address.')
        } else {
          triggerErrorToast(
            `Error saving addresses. ${
              i > 0 ? 'Not all addresses were saved.' : ''
            }`
          )
        }
        return
      }
    }
    if (count === 1) {
      triggerSuccessToast('Successfully generated 1 address.')
    } else {
      triggerSuccessToast(`Successfully generated ${count} addresses.`)
    }
    resetAndClose()
  }, [walletName, mnemonic, index, count, addressAdd, resetAndClose])

  const onSubmit = useCallback(async () => {
    await generateAddresses()
  }, [generateAddresses])

  return (
    <Dialog
      title={`Wallet ${walletName}: generate addresses`}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="accent" size="medium">
            Continue
          </FormSubmitButton>
        </div>
      }
    >
      <SeedLayout
        icon={<VerifyIcon />}
        description={<>Enter your seed mnemonic to generate addresses.</>}
      >
        <div className="flex flex-col gap-2 py-2">
          <FieldTextArea form={form} field={fields.mnemonic} name="mnemonic" />
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <FieldNumber form={form} field={fields.index} name="index" />
            </div>
            <div className="flex-1">
              <FieldNumber form={form} field={fields.count} name="count" />
            </div>
          </div>
        </div>
      </SeedLayout>
    </Dialog>
  )
}

function VerifyIcon() {
  return (
    <svg
      height={50}
      width={50}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>filter check</title>
      <g fill="#32d66a" stroke="none">
        <path d="M14,19H2a1,1,0,0,0,0,2H14a1,1,0,0,0,0-2Z" fill="#32d66a" />
        <path d="M14,27H2a1,1,0,0,0,0,2H14a1,1,0,0,0,0-2Z" fill="#32d66a" />
        <path d="M30,11H2a1,1,0,0,0,0,2H30a1,1,0,0,0,0-2Z" fill="#32d66a" />
        <path d="M2,5H30a1,1,0,0,0,0-2H2A1,1,0,0,0,2,5Z" fill="#32d66a" />
        <path d="M25,17a7,7,0,1,0,7,7A7.008,7.008,0,0,0,25,17Zm-.293,9.707a1,1,0,0,1-1.414,0L20.586,24,22,22.586l2,2,4-4L29.414,22Z" />
      </g>
    </svg>
  )
}
