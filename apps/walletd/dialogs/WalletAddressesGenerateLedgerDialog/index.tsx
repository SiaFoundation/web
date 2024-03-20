import {
  Button,
  ConfigFields,
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
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWallets } from '../../contexts/wallets'
import BigNumber from 'bignumber.js'
import { DeviceConnectForm } from '../DeviceConnectForm'
import { useLedger } from '../../contexts/ledger'
import { LedgerAddress } from './LedgerAddress'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'

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

function getDefaultValues(lastIndex: number) {
  return {
    ledgerConnected: false,
    index: new BigNumber(lastIndex),
    count: new BigNumber(1),
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
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const nextIndex = lastIndex + 1
  const defaultValues = getDefaultValues(nextIndex)
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { disconnect, error: ledgerError } = useLedger()

  // make sure the user explicitly connects to the correct device when
  // adding addresses - except when this dialog is triggered right after
  // the wallet is created.
  useEffect(() => {
    if (!walletJustCreated && open) {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (form.formState.isSubmitting) {
      return
    }
    form.setValue('index', new BigNumber(nextIndex))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextIndex])

  const formIndex = form.watch('index')
  const formCount = form.watch('count')

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

  useEffect(() => {
    if (open && walletJustCreated) {
      setIndicies({
        '0': emptyMeta(0),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    [setIndicies]
  )

  const indiciesWithAddresses = useMemo(() => {
    const indiciesWithAddresses: Record<string, AddressMeta> = {}
    for (const [index, { address, publicKey }] of Object.entries(indices)) {
      const existing = existingAddresses?.find(
        (a) => a.metadata.index === Number(index)
      )
      indiciesWithAddresses[index] = {
        isNew: !existing,
        index: Number(index),
        address: existing?.address || address,
        publicKey: existing?.metadata.publicKey || publicKey,
      }
    }
    return indiciesWithAddresses
  }, [existingAddresses, indices])

  const newGeneratedAddresses = useMemo(
    () =>
      Object.entries(indiciesWithAddresses)
        .filter(([index, item]) => item.isNew && item.address)
        .map(([index, item]) => item),
    [indiciesWithAddresses]
  )

  const saveAddresses = useCallback(async () => {
    const count = newGeneratedAddresses.length
    for (const [
      i,
      { address, publicKey, index },
    ] of newGeneratedAddresses.entries()) {
      const response = await addressAdd.put({
        params: {
          id: walletId,
        },
        payload: {
          address,
          description: '',
          metadata: {
            index,
            publicKey,
          },
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
      triggerSuccessToast('Successfully added 1 address.')
    } else {
      triggerSuccessToast(`Successfully added ${count} addresses.`)
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

  const onSubmit = useCallback(async () => {
    if (newGeneratedAddresses.length === 0) {
      triggerErrorToast(
        'Add and generate addresses with your Ledger device to continue.'
      )
      return
    }
    await saveAddresses()
    closeAndReset()
  }, [newGeneratedAddresses, saveAddresses, closeAndReset])

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
          {newGeneratedAddresses.length > 0 && (
            <FormSubmitButton form={form} variant="accent" size="medium">
              Save {newGeneratedAddresses.length}{' '}
              {newGeneratedAddresses.length === 1 ? 'address' : 'addresses'}
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
              )
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
