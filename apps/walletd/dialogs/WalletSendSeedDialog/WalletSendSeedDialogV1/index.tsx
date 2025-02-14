import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { useComposeFormV1 } from '../../_sharedWalletSendV1/useComposeFormV1'
import { useSendFormV1 } from './useSendFormV1'
import { useWalletBalance } from '@siafoundation/walletd-react'
import { SendFlowDialogV1 } from '../../_sharedWalletSendV1/SendFlowDialogV1'
import {
  SendParamsV1,
  SendStep,
  emptySendParamsV1,
} from '../../_sharedWalletSendV1/typesV1'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'

export type WalletSendSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendSeedDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSeedDialogV1({
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
  const [sendParams, setSendParams] = useState<SendParamsV1>(emptySendParamsV1)

  // Form for each step
  const compose = useComposeFormV1({
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

  const send = useSendFormV1({
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
    <SendFlowDialogV1
      type="seed"
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
