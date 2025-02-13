import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { useSendFormV2 } from './useSendFormV2'
import { useTxPoolFee, useWalletBalance } from '@siafoundation/walletd-react'
import {
  SendParamsV2,
  SendStep,
  emptySendParamsV2,
} from '../../_sharedWalletSendV2/typesV2'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'
import { useComposeFormV2 } from '../../_sharedWalletSendV2/useComposeFormV2'
import { SendFlowDialogV2 } from '../../_sharedWalletSendV2/SendFlowDialogV2'

export type WalletSendSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendSeedDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSeedDialogV2({
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
  const txPoolFee = useTxPoolFee()
  const fee = useMemo(() => {
    // https://github.com/SiaFoundation/walletd/blob/master/api/server.go#L738
    const feeMultiplier = 2000
    return new BigNumber(txPoolFee.data || 0).multipliedBy(feeMultiplier)
  }, [txPoolFee.data])
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
  const [sendParams, setSendParams] = useState<SendParamsV2>(emptySendParamsV2)

  // Form for each step
  const compose = useComposeFormV2({
    balanceSc,
    balanceSf,
    fee,
    defaultChangeAddress: addresses?.[0]?.address,
    onComplete: (params) => {
      setSendParams((d) => ({
        ...d,
        ...params,
      }))
      setStep('send')
    },
  })

  const send = useSendFormV2({
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
    <SendFlowDialogV2
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
