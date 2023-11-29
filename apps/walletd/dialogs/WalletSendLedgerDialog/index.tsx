import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { useWalletBalance } from '@siafoundation/react-walletd'
import { useComposeForm } from '../_sharedWalletSend/useComposeForm'
import { useSendForm } from './useSendForm'
import {
  SendParams,
  SendStep,
  emptySendParams,
} from '../_sharedWalletSend/types'
import { SendFlowDialog } from '../_sharedWalletSend/SendFlowDialog'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'

export type WalletSendLedgerDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendLedgerDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendLedgerDialog({
  params: dialogParams,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = dialogParams || {}
  const [step, setStep] = useState<SendStep>('compose')
  const [signedTxnId, setSignedTxnId] = useState<string>()
  const [sendParams, setSendParams] = useState<SendParams>(emptySendParams)
  const balance = useWalletBalance({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const { dataset: addresses } = useWalletAddresses({ id: walletId })

  const balanceSc = useMemo(
    () => new BigNumber(balance.data?.siacoins || 0),
    [balance.data]
  )

  const balanceSf = useMemo(
    () => new BigNumber(balance.data?.siafunds || 0),
    [balance.data]
  )

  // Form for each step
  const compose = useComposeForm({
    balanceSc,
    balanceSf,
    defaultChangeAddress: addresses?.[0]?.address,
    defaultClaimAddress: addresses?.[0]?.address,
    onComplete: (data) => {
      setSendParams((d) => ({
        ...d,
        ...data,
      }))
      setStep('send')
    },
  })
  const send = useSendForm({
    walletId,
    step,
    params: sendParams,
    onConfirm: ({ transactionId }) => {
      setSignedTxnId(transactionId)
      setStep('done')
    },
  })

  const controls = useMemo(() => {
    if (step === 'compose') {
      return {
        submitLabel: 'Generate transaction',
        form: compose.form,
        handleSubmit: compose.handleSubmit,
        reset: compose.reset,
      }
    }
    if (step === 'send') {
      return {
        submitLabel: 'Sign and broadcast transaction',
        form: send.form,
        handleSubmit: send.handleSubmit,
        reset: send.reset,
      }
    }
    return undefined
  }, [step, compose, send])

  return (
    <SendFlowDialog
      trigger={trigger}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          compose.reset()
          send.reset()
          setStep('compose')
        }
        onOpenChange(val)
      }}
      controls={controls}
      compose={compose}
      send={send}
      sendParams={sendParams}
      signedTxnId={signedTxnId}
      step={step}
      setStep={setStep}
    />
  )
}
