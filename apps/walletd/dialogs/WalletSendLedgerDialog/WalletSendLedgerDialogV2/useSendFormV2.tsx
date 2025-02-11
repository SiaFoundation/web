import { SendReceiptV2 } from '../../_sharedWalletSendV2/SendReceiptV2'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ConfigFields,
  FieldError,
  FieldLabel,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { DeviceConnectForm } from '../../DeviceConnectForm'
import { useLedger } from '../../../contexts/ledger'
import { V2Transaction, ChainIndex, TransactionID } from '@siafoundation/types'
import { LedgerSignTxn } from '../LedgerSignTxn'
import { useFundAndSignV2 } from './useFundAndSignV2'
import { SendParamsV2, SendStep } from '../../_sharedWalletSendV2/typesV2'
import { useBroadcastV2 } from '../../_sharedWalletSendV2/useBroadcastV2'
import { useCancelV2 } from '../../_sharedWalletSendV2/useCancelV2'

const defaultValues = {
  isConnected: false,
  isSigned: false,
}

type Props = {
  walletId: string
  step: SendStep
  params: SendParamsV2
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

export function useSendFormV2({ params, step, onConfirm }: Props) {
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const isConnected = form.watch('isConnected')
  const isSigned = form.watch('isSigned')
  const { device, error: ledgerError } = useLedger()
  const cancel = useCancelV2()
  const broadcast = useBroadcastV2()
  const fundAndSign = useFundAndSignV2()
  const [waitingForUser, setWaitingForUser] = useState(false)
  const [txnId, setTxnId] = useState<TransactionID>()
  const [txn, setTxn] = useState<V2Transaction>()
  const [basis, setBasis] = useState<ChainIndex>()

  useEffect(() => {
    if (step === 'compose') {
      setTxnId(undefined)
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

      const response = await broadcast({
        id: txnId,
        signedTransaction: txn,
        basis,
      })

      if ('error' in response) {
        triggerErrorToast({
          title: response.error,
        })
        return
      }

      onConfirm({
        transactionId: response.id,
      })
    },
    [broadcast, txnId, basis, txn, onConfirm]
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const runFundAndSign = useCallback(async () => {
    setWaitingForUser(true)
    const result = await fundAndSign(params)
    if ('error' in result) {
      triggerErrorToast({ title: result.error })
    } else {
      setTxnId(result.id)
      setTxn(result.signedTransaction)
      setBasis(result.basis)
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
      <SendReceiptV2 params={params} />
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
