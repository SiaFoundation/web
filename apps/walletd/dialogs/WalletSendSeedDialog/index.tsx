import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { useComposeForm } from '../_sharedWalletSend/useComposeForm'
import { useSendForm } from './useSendForm'
import { useWalletBalance } from '@siafoundation/react-walletd'
import { SendFlowDialog } from '../_sharedWalletSend/SendFlowDialog'
import {
  SendParams,
  SendStep,
  emptySendParams,
} from '../_sharedWalletSend/types'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'

export type WalletSendSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendSeedDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSeedDialog({
  params: dialogParams,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = dialogParams || {}
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

  const [step, setStep] = useState<SendStep>('compose')
  const [signedTxnId, setSignedTxnId] = useState<string>()
  const [sendParams, setSendParams] = useState<SendParams>(emptySendParams)

  // Form for each step
  const compose = useComposeForm({
    balanceSc,
    balanceSf,
    defaultChangeAddress: addresses?.[0]?.address,
    defaultClaimAddress: addresses?.[0]?.address,
    onComplete: (params) => {
      setSendParams((d) => ({
        ...d,
        ...params,
      }))
      setStep('send')
    },
  })

  const send = useSendForm({
    walletId,
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
