'use client'

import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { Separator } from '../../core/Separator'
import { Dialog } from '../../core/Dialog'
import { useSendSiacoinGenerateForm } from './Generate'
import { useSendSiacoinConfirmForm } from './Confirm'
import { ProgressSteps } from '../ProgressSteps'
import { WalletSendSiacoinComplete } from './Complete'
import { FormSubmitButton } from '../../components/Form'
import { SendSiacoinParams } from './types'

type Step = 'setup' | 'confirm' | 'done'

const emptyFormData: SendSiacoinParams = {
  address: '',
  hastings: new BigNumber(0),
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
  balance?: BigNumber
  fee: BigNumber
  send: (
    params: SendSiacoinParams & { includeFee: boolean },
  ) => Promise<{ transactionId?: string; error?: string }>
}

export function WalletSendSiacoinDialog({
  trigger,
  open,
  onOpenChange,
  balance,
  fee,
  send,
}: Props) {
  const [step, setStep] = useState<Step>('setup')
  const [signedTxnId, setSignedTxnId] = useState<string>()
  const [params, setParams] = useState<SendSiacoinParams>(emptyFormData)

  // Form for each step
  const generate = useSendSiacoinGenerateForm({
    balance,
    fee,
    onComplete: (data) => {
      setParams(data)
      setStep('confirm')
    },
  })
  const confirm = useSendSiacoinConfirmForm({
    fee,
    params,
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
        el: generate.el,
        form: generate.form,
        reset: generate.reset,
        submit: generate.submit,
      }
    }
    if (step === 'confirm') {
      return {
        submitLabel: 'Broadcast transaction',
        el: confirm.el,
        form: confirm.form,
        reset: confirm.reset,
        submit: confirm.submit,
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
      onSubmit={controls ? controls.submit : undefined}
      controls={
        controls && (
          <div className="flex flex-col gap-1">
            <FormSubmitButton form={controls.form}>
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
            data={params}
            fee={fee}
            transactionId={signedTxnId}
          />
        )}
      </div>
    </Dialog>
  )
}
