/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  Dialog,
  FieldNumber,
  FormSubmitButton,
  triggerErrorToast,
  triggerSuccessToast,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import {
  WalletAddressMetadata,
  useWalletAddressAdd,
} from '@siafoundation/react-walletd'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWallets } from '../../contexts/wallets'
import BigNumber from 'bignumber.js'
import { getFieldMnemonic, MnemonicFieldType } from '../../lib/fieldMnemonic'
import { FieldMnemonic } from '../FieldMnemonic'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { getSDK } from '@siafoundation/sdk'

export type WalletAddressesGenerateSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletAddressesGenerateSeedDialogParams
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

function getFields({
  mnemonicHash,
  mnemonicFieldType,
  setMnemonicFieldType,
}: {
  mnemonicHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
}): ConfigFields<ReturnType<typeof getDefaultValues>, never> {
  return {
    mnemonic: getFieldMnemonic({
      mnemonicHash,
      setMnemonicFieldType,
      mnemonicFieldType,
    }),
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

export function WalletAddressesGenerateSeedDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = params || {}
  const { lastIndex } = useWalletAddresses({ id: walletId })
  const { dataset, cacheWalletMnemonic } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const nextIndex = lastIndex + 1
  const defaultValues = getDefaultValues(nextIndex)
  const [mnemonicFieldType, setMnemonicFieldType] =
    useState<MnemonicFieldType>('password')
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
    mnemonicHash: wallet?.metadata.mnemonicHash,
    mnemonicFieldType,
    setMnemonicFieldType,
  })

  const addressAdd = useWalletAddressAdd()
  const generateAddresses = useCallback(
    async (mnemonic: string, index: number, count: number) => {
      for (let i = index; i < index + count; i++) {
        const kp = getSDK().wallet.keyPairFromSeedPhrase(mnemonic, i)
        if (kp.error) {
          triggerErrorToast({
            title: 'Error generating addresses',
            body: kp.error,
          })
          return
        }
        const suh = getSDK().wallet.standardUnlockHash(kp.publicKey)
        if (suh.error) {
          triggerErrorToast({
            title: 'Error generating unlock hash',
            body: suh.error,
          })
          return
        }
        const uc = getSDK().wallet.standardUnlockConditions(kp.publicKey)
        if (uc.error) {
          triggerErrorToast({
            title: 'Error generating unlock conditions',
            body: uc.error,
          })
          return
        }
        const metadata: WalletAddressMetadata = {
          index: i,
          unlockConditions: uc.unlockConditions,
        }
        const response = await addressAdd.put({
          params: {
            id: walletId,
          },
          payload: {
            address: suh.address,
            description: '',
            // TODO: add spendPolicy?
            metadata,
          },
        })
        if (response.error) {
          if (count === 1) {
            triggerErrorToast({
              title: 'Error saving address',
              body: response.error,
            })
          } else {
            triggerErrorToast({
              title: 'Error saving addresses',
              body: i > 0 ? 'Not all addresses were saved.' : '',
            })
          }
          return
        }
      }
      if (count === 1) {
        triggerSuccessToast({ title: 'Generated 1 address' })
      } else {
        triggerSuccessToast({
          title: `Generated ${count} addresses`,
        })
      }

      // if successfully generated an address, cache the seed
      cacheWalletMnemonic(walletId, mnemonic)

      closeAndReset()
    },
    [closeAndReset, addressAdd, walletId, cacheWalletMnemonic]
  )

  const onSubmit = useCallback(() => {
    return generateAddresses(
      wallet.state.mnemonic || mnemonic,
      index.toNumber(),
      count.toNumber()
    )
  }, [generateAddresses, mnemonic, index, count, wallet])

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
      <FieldMnemonic
        walletId={walletId}
        name="mnemonic"
        form={form}
        fields={fields}
        actionText="generate addresses"
      />
      <div className="flex gap-2 w-full pt-3">
        <div className="flex-1">
          <FieldNumber form={form} fields={fields} name="index" />
        </div>
        <div className="flex-1">
          <FieldNumber form={form} fields={fields} name="count" />
        </div>
      </div>
    </Dialog>
  )
}
