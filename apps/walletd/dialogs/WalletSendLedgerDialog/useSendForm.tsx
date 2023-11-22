import { SendReceipt } from '../_sharedWalletSend/SendReceipt'
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
import { useSign } from './useSign'
import { useBroadcast } from '../_sharedWalletSend/useBroadcast'
import { useFundAndSign } from './useFundAndSign'
import { useCancel } from '../_sharedWalletSend/useCancel'
import { useFund } from '../_sharedWalletSend/useFund'
import { SendParams, SendStep } from '../_sharedWalletSend/types'

const defaultValues = {
  isConnected: false,
  isSigned: false,
}

type Props = {
  walletId: string
  step: SendStep
  params: SendParams
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

export function useSendForm({ params, step, onConfirm }: Props) {
  const { address, siacoin, siafund, mode, fee } = params || {}
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const isConnected = form.watch('isConnected')
  const isSigned = form.watch('isSigned')
  const { device, error: ledgerError } = useLedger()
  const cancel = useCancel()
  const sign = useSign({ cancel })
  const broadcast = useBroadcast({ cancel })
  const fund = useFund()
  const fundAndSign = useFundAndSign({ cancel, fund, sign })
  const [waitingForUser, setWaitingForUser] = useState(false)
  const [txn, setTxn] = useState<Transaction>()

  useEffect(() => {
    if (step === 'compose') {
      setTxn(undefined)
    }
  }, [step])

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
      mode,
      siacoin,
      siafund,
      fee,
    })
    if (error) {
      triggerErrorToast(error)
    } else {
      setTxn(signedTransaction)
      form.setValue('isSigned', true)
    }
    setWaitingForUser(false)
  }, [form, fundAndSign, mode, address, siacoin, siafund, fee])

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
      <SendReceipt params={params} />
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
