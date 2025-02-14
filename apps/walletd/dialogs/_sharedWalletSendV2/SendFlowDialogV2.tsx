import {
  Separator,
  Dialog,
  ProgressSteps,
  FormSubmitButton,
  Text,
  Button,
} from '@siafoundation/design-system'
import { SendParamsV2, SendStep } from './typesV2'
import { UseFormReturn } from 'react-hook-form'
import { SendDoneV2 } from './SendDoneV2'
import { TransactionVersionIndicator } from '../_sharedWalletSend/TransactionVersionIndicator'

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
  sendParams: SendParamsV2
  signedTxnId?: string
  step: SendStep
  setStep: (step: SendStep) => void
  controls?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>
    submitLabel: string
    handleSubmit: () => void
  }
  disabledMessage?: React.ReactNode
  type: 'seed' | 'ledger'
}

export function SendFlowDialogV2({
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
  disabledMessage,
  type,
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
          <div className="flex flex-col gap-3">
            <Separator className="w-full" />
            <div className="flex justify-center">
              <TransactionVersionIndicator type={type} />
            </div>
            {disabledMessage ? (
              <Button size="medium" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            ) : (
              <FormSubmitButton form={controls.form}>
                {controls.submitLabel}
              </FormSubmitButton>
            )}
          </div>
        )
      }
      contentVariants={{
        className: 'w-[450px]',
      }}
    >
      {disabledMessage ? (
        <div className="z-10 top-0 right-0 bottom-0 left-0 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <Text size="16" className="text-red-500">
            {disabledMessage}
          </Text>
        </div>
      ) : (
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
            <SendDoneV2 params={sendParams} transactionId={signedTxnId} />
          )}
        </div>
      )}
    </Dialog>
  )
}
