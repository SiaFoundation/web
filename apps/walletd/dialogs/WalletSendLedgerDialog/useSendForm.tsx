import { SendReceiptV1 } from '../_sharedWalletSendV1/SendReceiptV1'
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
import { Transaction, ChainIndex } from '@siafoundation/types'
import { LedgerSignTxn } from './LedgerSignTxn'
import { useSign } from './useSign'
import { useBroadcastV1 } from '../_sharedWalletSendV1/useBroadcastV1'
import { useFundAndSign } from './useFundAndSign'
import { useCancelV1 } from '../_sharedWalletSendV1/useCancelV1'
import { useFundV1 } from '../_sharedWalletSendV1/useFundV1'
import { SendParamsV1, SendStep } from '../_sharedWalletSendV1/typesV1'

const defaultValues = {
  isConnected: false,
  isSigned: false,
}

type Props = {
  walletId: string
  step: SendStep
  params: SendParamsV1
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
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const isConnected = form.watch('isConnected')
  const isSigned = form.watch('isSigned')
  const { device, error: ledgerError } = useLedger()
  const cancel = useCancelV1()
  const sign = useSign({ cancel })
  const broadcast = useBroadcastV1({ cancel })
  const fund = useFundV1()
  const fundAndSign = useFundAndSign({ cancel, fund, sign })
  const [waitingForUser, setWaitingForUser] = useState(false)
  const [txn, setTxn] = useState<Transaction>()
  const [basis, setBasis] = useState<ChainIndex>()

  useEffect(() => {
    if (step === 'compose') {
      setTxn(undefined)
      setBasis(undefined)
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

      if (!txn) {
        return
      }

      if (!basis) {
        return
      }

      const { error } = await broadcast({
        signedTransaction: txn,
        basis,
      })

      if (error) {
        triggerErrorToast({
          title: error,
        })
        return
      }

      onConfirm({
        // transactionId,
      })
    },
    [broadcast, txn, basis, onConfirm]
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const runFundAndSign = useCallback(async () => {
    setWaitingForUser(true)
    const { signedTransaction, error, basis } = await fundAndSign(params)
    if (error) {
      triggerErrorToast({ title: error })
    } else {
      setTxn(signedTransaction)
      setBasis(basis)
      form.setValue('isSigned', true)
    }
    setWaitingForUser(false)
  }, [form, fundAndSign, params])

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
      <SendReceiptV1 params={params} />
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
