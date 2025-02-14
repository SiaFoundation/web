import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { useWalletBalance } from '@siafoundation/walletd-react'
import { useComposeFormV1 } from '../../_sharedWalletSendV1/useComposeFormV1'
import { useSendFormV1 } from './useSendFormV1'
import {
  SendParamsV1,
  SendStep,
  emptySendParamsV1,
} from '../../_sharedWalletSendV1/typesV1'
import { SendFlowDialogV1 } from '../../_sharedWalletSendV1/SendFlowDialogV1'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'

type Props = {
  params?: {
    walletId: string
  }
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendLedgerDialogV1({
  params: dialogParams,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = dialogParams || {}
  const [step, setStep] = useState<SendStep>('compose')
  const [signedTxnId, setSignedTxnId] = useState<string>()
  const [sendParams, setSendParams] = useState<SendParamsV1>(emptySendParamsV1)
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
  const compose = useComposeFormV1({
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
  const send = useSendFormV1({
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
    <SendFlowDialogV1
      type="ledger"
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
