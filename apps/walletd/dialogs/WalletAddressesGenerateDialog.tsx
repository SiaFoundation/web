/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  ConfigFields,
  Dialog,
  FieldNumber,
  FieldText,
  FormSubmitButton,
  triggerErrorToast,
  triggerSuccessToast,
  View16,
  ViewOff16,
} from '@siafoundation/design-system'
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddresses } from '../contexts/addresses'
import { useDialogFormHelpers } from '../hooks/useDialogFormHelpers'
import { getWalletdWasm } from '../lib/wasm'
import { SeedLayout } from './SeedLayout'
import * as bip39 from 'bip39'
import { useWallets } from '../contexts/wallets'
import { blake2bHex } from 'blakejs'
import BigNumber from 'bignumber.js'
import { VerifyIcon } from './VerifyIcon'

export type WalletAddressesGenerateDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletAddressesGenerateDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues(lastIndex: number) {
  return {
    mnemonic: '',
    index: new BigNumber(lastIndex),
    count: new BigNumber(1),
  }
}

type MnemonicType = 'text' | 'password'

function getFields({
  seedHash,
  mnemonicType,
  setMnemonicType,
}: {
  seedHash?: string
  mnemonicType: MnemonicType
  setMnemonicType: (type: MnemonicType) => void
}): ConfigFields<ReturnType<typeof getDefaultValues>, never> {
  return {
    mnemonic: {
      type: mnemonicType,
      title: 'Seed',
      actions: (
        <div className="flex gap-1">
          <Button
            tip={mnemonicType === 'password' ? 'Show seed' : 'Hide seed'}
            tabIndex={-1}
            variant="ghost"
            icon="hover"
            onClick={() =>
              setMnemonicType(mnemonicType === 'password' ? 'text' : 'password')
            }
          >
            {mnemonicType === 'password' ? <ViewOff16 /> : <View16 />}
          </Button>
        </div>
      ),
      placeholder:
        'island submit vague scrub exhibit cherry front spoon crop debate filter virus',
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) =>
            bip39.validateMnemonic(value) ||
            'seed should be 12 word BIP39 mnemonic',
          match: (mnemonic: string) => {
            const seed = bip39.mnemonicToSeedSync(mnemonic)
            return (
              !seedHash ||
              blake2bHex(seed) === seedHash ||
              'seed does not match'
            )
          },
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

export function WalletAddressesGenerateDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = params || {}
  const { lastIndex } = useAddresses()
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const nextIndex = lastIndex + 1
  const defaultValues = getDefaultValues(nextIndex)
  const [mnemonicType, setMnemonicType] = useState<'password' | 'text'>(
    'password'
  )
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  useEffect(() => {
    if (form.formState.isSubmitting) {
      return
    }
    form.setValue('index', new BigNumber(nextIndex))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextIndex])

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const mnemonic = form.watch('mnemonic')
  const index = form.watch('index')
  const count = form.watch('count')

  const fields = getFields({
    seedHash: wallet?.seedHash,
    mnemonicType,
    setMnemonicType,
  })

  const addressAdd = useWalletAddressAdd()
  const generateAddresses = useCallback(
    async (mnemonic: string, index: number, count: number) => {
      for (let i = index; i < index + count; i++) {
        const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
        const addrRes = getWalletdWasm().addressFromSeed(seed, i)
        if (addrRes.error) {
          triggerErrorToast('Error generating addresses.')
          return
        }
        const response = await addressAdd.put({
          params: {
            id: walletId,
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
      closeAndReset()
    },
    [walletId, addressAdd, closeAndReset]
  )

  const onSubmit = useCallback(() => {
    return generateAddresses(mnemonic, index.toNumber(), count.toNumber())
  }, [generateAddresses, mnemonic, index, count])

  return (
    <Dialog
      title={`Wallet ${wallet?.name}: generate addresses`}
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
          <FieldText form={form} field={fields.mnemonic} name="mnemonic" />
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
