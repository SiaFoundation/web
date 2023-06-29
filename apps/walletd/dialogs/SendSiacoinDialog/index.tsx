import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { toHastings } from '@siafoundation/sia-js'
import {
  Separator,
  Dialog,
  ProgressSteps,
  FormSubmitButton,
} from '@siafoundation/design-system'
import { useSendSiacoinGenerateForm } from './Generate'
import { useSendSiacoinConfirmForm } from './Confirm'
import { WalletSendSiacoinComplete } from './Complete'
import { useWallets } from '../../contexts/wallets'

export type SendSiacoinDialogParams = {
  walletId: string
}

type Step = 'setup' | 'confirm' | 'done'

const fee = toHastings(0.00393)

export type SendData = {
  seedHash: string
  address: string
  siacoin: BigNumber
  includeFee: boolean
}

export type SendParams = {
  mnemonic: string
  address: string
  siacoin: BigNumber
}

const emptySendData: SendData = {
  seedHash: '',
  address: '',
  siacoin: new BigNumber(0),
  includeFee: false,
}

type Props = {
  params?: SendSiacoinDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
  balance?: BigNumber
  send: (
    params: SendParams
  ) => Promise<{ transactionId?: string; error?: string }>
}

export function SendSiacoinDialog({
  params,
  trigger,
  open,
  onOpenChange,
  balance,
  send,
}: Props) {
  const { walletId } = params || {}
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)

  const [step, setStep] = useState<Step>('setup')
  const [signedTxnId, setSignedTxnId] = useState<string>()
  const [data, setData] = useState<SendData>(emptySendData)

  useEffect(() => {
    setData((d) => ({
      ...d,
      seedHash: wallet?.seedHash,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletId])

  // Form for each step
  const generate = useSendSiacoinGenerateForm({
    balance,
    fee,
    onComplete: (data) => {
      setData((d) => ({
        ...d,
        ...data,
      }))
      setStep('confirm')
    },
  })
  const confirm = useSendSiacoinConfirmForm({
    fee,
    data,
    send,
    onConfirm: ({ transactionId }) => {
      setSignedTxnId(transactionId)
      setStep('done')
    },
  })

  const controls = useMemo(() => {
    if (step === 'setup') {
      return {
        submitLabel: 'Generate transaction',
        form: generate.form,
        handleSubmit: generate.handleSubmit,
        reset: generate.reset,
      }
    }
    if (step === 'confirm') {
      return {
        submitLabel: 'Sign and broadcast transaction',
        form: confirm.form,
        handleSubmit: confirm.handleSubmit,
        reset: confirm.reset,
      }
    }
    return undefined
  }, [step, generate, confirm])

  return (
    <Dialog
      trigger={trigger}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          generate.reset()
          confirm.reset()
          setStep('setup')
        }
        onOpenChange(val)
      }}
      title="Send siacoin"
      onSubmit={controls ? controls.handleSubmit : undefined}
      controls={
        controls?.form && (
          <div className="flex flex-col gap-1">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <FormSubmitButton<any> form={controls.form}>
              {controls.submitLabel}
            </FormSubmitButton>
          </div>
        )
      }
      contentVariants={{
        className: 'w-[400px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <ProgressSteps
          onChange={(val) => setStep(val as Step)}
          activeStep={step}
          steps={[
            {
              id: 'setup',
              label: 'Setup',
            },
            {
              id: 'confirm',
              label: 'Confirm',
            },
            {
              id: 'done',
              label: 'Complete',
            },
          ]}
        />
        <Separator className="w-full mt-4" />
        {step === 'setup' && generate.el}
        {step === 'confirm' && confirm.el}
        {step === 'done' && (
          <WalletSendSiacoinComplete
            formData={data}
            fee={fee}
            transactionId={signedTxnId}
          />
        )}
      </div>
    </Dialog>
  )
}
