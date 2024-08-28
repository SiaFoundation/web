import {
  Separator,
  Dialog,
  ProgressSteps,
  FormSubmitButton,
} from '@siafoundation/design-system'
import { SendDone } from './SendDone'
import { SendParams, SendStep } from './types'
import { UseFormReturn } from 'react-hook-form'

export type SendDialogParams = {
  walletId: string
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
  compose: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>
    el: React.ReactNode
    handleSubmit: () => void
    reset: () => void
  }
  send: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>
    el: React.ReactNode
    handleSubmit: () => void
    reset: () => void
  }
  sendParams: SendParams
  signedTxnId?: string
  step: SendStep
  setStep: (step: SendStep) => void
  controls?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>
    submitLabel: string
    handleSubmit: () => void
  }
}

export function SendFlowDialog({
  trigger,
  open,
  onOpenChange,
  sendParams,
  signedTxnId,
  step,
  send,
  compose,
  setStep,
  controls,
}: Props) {
  return (
    <Dialog
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
      title="Send"
      onSubmit={controls ? controls.handleSubmit : undefined}
      controls={
        controls?.form && (
          <div className="flex flex-col gap-1">
            <FormSubmitButton form={controls.form}>
              {controls.submitLabel}
            </FormSubmitButton>
          </div>
        )
      }
      contentVariants={{
        className: 'w-[450px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <ProgressSteps
          onChange={(step: SendStep) => {
            setStep(step)
          }}
          activeStep={step}
          steps={[
            {
              id: 'compose',
              label: 'Compose',
            },
            {
              id: 'send',
              label: 'Sign & Send',
            },
            {
              id: 'done',
              label: 'Complete',
            },
          ]}
        />
        <Separator className="w-full mt-4" />
        {step === 'compose' && compose.el}
        {step === 'send' && send.el}
        {step === 'done' && (
          <SendDone params={sendParams} transactionId={signedTxnId} />
        )}
      </div>
    </Dialog>
  )
}
