import BigNumber from 'bignumber.js'
import { Receipt } from './Receipt'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ConfigFields,
  FieldError,
  FieldLabel,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { DeviceConnectForm } from '../DeviceConnectForm'
import { useLedger } from '../../contexts/ledger'
import { Transaction } from '@siafoundation/react-walletd'
import { LedgerSignTxn } from './LedgerSignTxn'
import { useTxnMethods } from './useTxnMethods'

const defaultValues = {
  isConnected: false,
  isSigned: false,
}

type SendData = {
  address: string
  siacoin: BigNumber
  fee: BigNumber
  includeFee: boolean
}

type Props = {
  walletId: string
  data: SendData
  onConfirm: (params: { transactionId?: string }) => void
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    isConnected: {
      type: 'boolean',
      title: '',
      validation: {
        validate: {
          isConnected: (value: boolean) => value || 'Ledger must be connected',
        },
      },
    },
    isSigned: {
      type: 'boolean',
      title: '',
      validation: {
        validate: {
          isSigned: (value: boolean) => value || 'Transaction must be signed',
        },
      },
    },
  }
}

export function useSendForm({ data, onConfirm }: Props) {
  const { address, siacoin, fee } = data || {}
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const isConnected = form.watch('isConnected')
  const isSigned = form.watch('isSigned')
  const { device, error: ledgerError } = useLedger()
  const { fundAndSign, broadcast, cancel } = useTxnMethods()
  const [waitingForUser, setWaitingForUser] = useState(false)
  const [txn, setTxn] = useState<Transaction>()

  useEffect(() => {
    if (device) {
      form.setValue('isConnected', true)
    } else {
      setWaitingForUser(false)
      form.setValue('isConnected', false)
    }
  }, [form, device])

  useEffect(() => {
    if (ledgerError) {
      form.setError('isConnected', {
        message: ledgerError.message,
      })
    } else {
      form.clearErrors('isConnected')
    }
  }, [form, ledgerError])

  useEffect(() => {
    if (!txn) {
      form.setValue('isSigned', false)
    }
  }, [form, txn])

  const fields = useMemo(() => getFields(), [])

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      if (!values.isConnected) {
        return
      }

      const { error } = await broadcast({
        signedTransaction: txn,
      })

      if (error) {
        triggerErrorToast(error)
        return
      }

      onConfirm({
        // transactionId,
      })
    },
    [broadcast, txn, onConfirm]
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const runFundAndSign = useCallback(async () => {
    setWaitingForUser(true)
    const { signedTransaction, error } = await fundAndSign({
      address,
      siacoin,
      fee,
    })
    if (error) {
      triggerErrorToast(error)
    } else {
      setTxn(signedTransaction)
      form.setValue('isSigned', true)
    }
    setWaitingForUser(false)
  }, [form, fundAndSign, address, siacoin, fee])

  const el = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <FieldLabel title="Device" name="isConnected" />
          <FieldError name="isConnected" form={form} />
          <DeviceConnectForm />
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel title="Signature" name="isSigned" />
          <FieldError name="isSigned" form={form} />
          <LedgerSignTxn
            waitingForUser={waitingForUser}
            isConnected={isConnected}
            isSigned={isSigned}
            sign={runFundAndSign}
          />
        </div>
      </div>
      <Receipt address={address} siacoin={siacoin} fee={fee} />
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    cancel: () => {
      if (txn) {
        cancel(txn)
      }
    },
    reset: () => form.reset(defaultValues),
  }
}
