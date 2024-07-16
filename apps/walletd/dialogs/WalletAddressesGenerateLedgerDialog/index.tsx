import {
  Button,
  type ConfigFields,
  Dialog,
  FieldError,
  FieldLabel,
  FieldNumber,
  FormSubmitButton,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { getSDK } from '@siafoundation/sdk'
import { useWalletAddressAdd } from '@siafoundation/walletd-react'
import type { WalletAddressMetadata } from '@siafoundation/walletd-types'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLedger } from '../../contexts/ledger'
import { useWallets } from '../../contexts/wallets'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { DeviceConnectForm } from '../DeviceConnectForm'
import {
  FieldRescan,
  getDefaultRescanValues,
  getRescanFields,
  useTriggerRescan,
} from '../FieldRescan'
import { LedgerAddress } from './LedgerAddress'

export type WalletAddressesGenerateLedgerDialogParams = {
  walletId: string
  walletJustCreated?: boolean
}

type Props = {
  params?: WalletAddressesGenerateLedgerDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues({
  nextIndex,
  rescanStartHeight,
}: {
  nextIndex: number
  rescanStartHeight: number
}) {
  return {
    ledgerConnected: false,
    index: new BigNumber(nextIndex),
    count: new BigNumber(1),
    ...getDefaultRescanValues({ rescanStartHeight }),
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(): ConfigFields<Values, never> {
  return {
    ledgerConnected: {
      type: 'boolean',
      title: '',
      validation: {
        validate: {
          ledgerConnected: (value: boolean) =>
            value || 'Ledger must be connected',
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
      placeholder: '1',
      validation: {
        required: 'required',
        max: 1000,
      },
    },
    ...getRescanFields(),
  }
}

type AddressMeta = {
  isNew: boolean
  address: string
  publicKey: string
  index: number
}

function emptyMeta(index: number) {
  return {
    isNew: true,
    address: '',
    publicKey: '',
    index,
  }
}

export function WalletAddressesGenerateLedgerDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId, walletJustCreated } = params || {}
  const {
    dataset: existingAddresses,
    lastIndex,
    datasetCount,
  } = useWalletAddresses({ id: walletId })
  const syncStatus = useSyncStatus()
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const nextIndex = lastIndex + 1
  const defaultValues = getDefaultValues({
    nextIndex,
    rescanStartHeight: syncStatus.nodeBlockHeight,
  })
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { disconnect, error: ledgerError } = useLedger()

  // make sure the user explicitly connects to the correct device when
  // adding addresses - except when this dialog is triggered right after
  // the wallet is created.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!walletJustCreated && open) {
      disconnect()
    }
  }, [open])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (form.formState.isSubmitting) {
      return
    }
    form.setValue('index', new BigNumber(nextIndex))
  }, [nextIndex])

  const formIndex = form.watch('index')
  const formCount = form.watch('count')
  const shouldRescan = form.watch('shouldRescan')

  const fields = getFields()

  const addressAdd = useWalletAddressAdd()

  useEffect(() => {
    if (ledgerError) {
      form.setError('ledgerConnected', {
        message: ledgerError.message,
      })
    } else {
      form.clearErrors('ledgerConnected')
    }
  }, [form, ledgerError])

  // index to address
  const [indices, setIndicies] = useState<Record<string, AddressMeta>>({})

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (open && walletJustCreated) {
      setIndicies({
        '0': emptyMeta(0),
      })
    }
  }, [open])

  const addIndicies = useCallback(() => {
    if (!formIndex || !formCount) {
      return
    }
    const newIndices = { ...indices }
    for (
      let i = formIndex.toNumber();
      i < formIndex.plus(formCount).toNumber();
      i++
    ) {
      const existing = newIndices[i]
      if (!existing) {
        newIndices[i] = emptyMeta(i)
      }
    }
    setIndicies(newIndices)
  }, [formIndex, formCount, indices])

  const removeIndex = useCallback((index: number) => {
    setIndicies((i) => {
      const newIndices = { ...i }
      delete newIndices[index]
      return newIndices
    })
  }, [])

  const setAddress = useCallback(
    ({
      index,
      address,
      publicKey,
    }: {
      index: number
      address: string
      publicKey: string
    }) => {
      setIndicies((i) => {
        const newIndices = { ...i }
        newIndices[index] = {
          ...newIndices[index],
          address,
          publicKey,
        }
        return newIndices
      })
    },
    [setIndicies],
  )

  const indiciesWithAddresses = useMemo(() => {
    const indiciesWithAddresses: Record<string, AddressMeta> = {}
    for (const [index, { address, publicKey }] of Object.entries(indices)) {
      const existing = existingAddresses?.find(
        (a) => a.metadata.index === Number(index),
      )
      indiciesWithAddresses[index] = {
        isNew: !existing,
        index: Number(index),
        address: existing?.address || address,
        publicKey:
          existing?.metadata.unlockConditions.publicKeys[0] || publicKey,
      }
    }
    return indiciesWithAddresses
  }, [existingAddresses, indices])

  const newGeneratedAddresses = useMemo(
    () =>
      Object.entries(indiciesWithAddresses)
        .filter(([index, item]) => item.isNew && item.address)
        .map(([index, item]) => item),
    [indiciesWithAddresses],
  )

  const saveAddresses = useCallback(async () => {
    const count = newGeneratedAddresses.length
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
    for (const [
      i,
      { address, publicKey, index },
    ] of newGeneratedAddresses.entries()) {
      const uc = getSDK().wallet.standardUnlockConditions(publicKey)
      if (uc.error) {
        toastBatchError(count, i, uc.error)
        return
      }
      const metadata: WalletAddressMetadata = {
        index,
        unlockConditions: uc.unlockConditions,
      }
      const response = await addressAdd.put({
        params: {
          id: walletId,
        },
        payload: {
          address,
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
      triggerSuccessToast({ title: 'Added 1 address' })
    } else {
      triggerSuccessToast({ title: `Added ${count} addresses` })
    }
    return
  }, [addressAdd, walletId, newGeneratedAddresses])

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange: (open: boolean) => {
      setIndicies({})
      onOpenChange(open)
    },
    defaultValues,
  })

  const triggerRescan = useTriggerRescan()
  const onSubmit = useCallback(
    async (values: Values) => {
      if (newGeneratedAddresses.length > 0) {
        await saveAddresses()
      }
      await triggerRescan(values)
      closeAndReset()
    },
    [newGeneratedAddresses, saveAddresses, closeAndReset, triggerRescan],
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
        <div className="flex gap-1 justify-end">
          <Button size="medium" variant="gray" onClick={closeAndReset}>
            Close
          </Button>
          {(newGeneratedAddresses.length > 0 || shouldRescan) && (
            <FormSubmitButton
              form={form}
              size="medium"
              variant={shouldRescan ? 'red' : 'accent'}
            >
              {newGeneratedAddresses.length > 0
                ? `Save ${newGeneratedAddresses.length} ${
                    newGeneratedAddresses.length === 1 ? 'address' : 'addresses'
                  }${shouldRescan ? ' and rescan' : ''}`
                : 'Rescan'}
            </FormSubmitButton>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Text>
          Wallet currently has {datasetCount}{' '}
          {datasetCount === 1 ? 'address' : 'addresses'} with a highest index of{' '}
          {lastIndex}. Select a start index and the number of sequential
          addresses you would like to generate.
        </Text>
        <div className="flex flex-col gap-1">
          <FieldLabel title="Device" name="ledgerConnected" />
          <FieldError name="ledgerConnected" form={form} />
          <DeviceConnectForm />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 w-full pt-3 items-end">
            <div className="flex-1">
              <FieldNumber form={form} fields={fields} name="index" />
            </div>
            <div className="flex-1">
              <FieldNumber form={form} fields={fields} name="count" />
            </div>
            <Button onClick={addIndicies}>Add</Button>
          </div>
          <div className="flex flex-col gap-1">
            {Object.entries(indiciesWithAddresses).map(
              ([index, { address, isNew }]) => (
                <LedgerAddress
                  key={index}
                  isNew={isNew}
                  address={address}
                  setAddress={setAddress}
                  index={Number(index)}
                  remove={() => removeIndex(Number(index))}
                />
              ),
            )}
          </div>
        </div>
        <FieldRescan form={form} fields={fields} />
      </div>
    </Dialog>
  )
}
