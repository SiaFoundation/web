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
} from '@siafoundation/walletd-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWallets } from '../../contexts/wallets'
import BigNumber from 'bignumber.js'
import { getFieldMnemonic, MnemonicFieldType } from '../../lib/fieldMnemonic'
import { FieldMnemonic } from '../FieldMnemonic'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { getSDK } from '@siafoundation/sdk'
import {
  FieldRescan,
  getRescanFields,
  getDefaultRescanValues,
  useTriggerRescan,
} from '../FieldRescan'
import { useSyncStatus } from '../../hooks/useSyncStatus'

export type WalletAddressesGenerateSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletAddressesGenerateSeedDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues({
  nextIndex,
  currentHeight,
}: {
  nextIndex: number
  currentHeight: number
}) {
  return {
    mnemonic: '',
    index: new BigNumber(nextIndex),
    count: new BigNumber(1),
    ...getDefaultRescanValues({ rescanStartHeight: currentHeight }),
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields({
  mnemonicHash,
  mnemonicFieldType,
  setMnemonicFieldType,
}: {
  mnemonicHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
}): ConfigFields<Values, never> {
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
    ...getRescanFields(),
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
  const syncStatus = useSyncStatus()
  const defaultValues = getDefaultValues({
    nextIndex,
    currentHeight: syncStatus.nodeBlockHeight,
  })
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
  const shouldRescan = form.watch('shouldRescan')

  const fields = getFields({
    mnemonicHash: wallet?.metadata.mnemonicHash,
    mnemonicFieldType,
    setMnemonicFieldType,
  })

  const addressAdd = useWalletAddressAdd()
  const generateAddresses = useCallback(
    async (mnemonic: string, index: number, count: number) => {
      function toastBatchError(count: number, i: number, body: string) {
        triggerErrorToast({
          title: 'Error generating addresses',
          body:
            i > 0
              ? `${
                  i + 1
                }/${count} addresses were generated and saved. Batch failed on with: ${body}`
              : body,
        })
      }
      for (let i = index; i < index + count; i++) {
        const kp = getSDK().wallet.keyPairFromSeedPhrase(mnemonic, i)
        if (kp.error) {
          toastBatchError(count, i, kp.error)
          return
        }
        const suh = getSDK().wallet.standardUnlockHash(kp.publicKey)
        if (suh.error) {
          toastBatchError(count, i, suh.error)
          return
        }
        const uc = getSDK().wallet.standardUnlockConditions(kp.publicKey)
        if (uc.error) {
          toastBatchError(count, i, uc.error)
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
          toastBatchError(count, i, response.error)
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

  const triggerRescan = useTriggerRescan()
  const onSubmit = useCallback(
    async (values: Values) => {
      await generateAddresses(
        wallet.state.mnemonic || mnemonic,
        index.toNumber(),
        count.toNumber()
      )
      triggerRescan(values)
    },
    [generateAddresses, mnemonic, index, count, wallet, triggerRescan]
  )

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
          <FormSubmitButton
            form={form}
            size="medium"
            variant={shouldRescan ? 'red' : 'accent'}
          >
            Generate addresses
            {shouldRescan ? ' and rescan' : ''}
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
      <FieldRescan form={form} fields={fields} />
    </Dialog>
  )
}
