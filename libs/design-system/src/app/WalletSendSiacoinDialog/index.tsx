import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { toHastings } from '@siafoundation/sia-js'
import { Separator } from '../../core/Separator'
import { Dialog } from '../../core/Dialog'
import { useSendSiacoinGenerateForm } from './Generate'
import { useSendSiacoinConfirmForm } from './Confirm'
import { ProgressSteps } from '../ProgressSteps'
import { WalletSendSiacoinComplete } from './Complete'
import { Transaction } from '@siafoundation/react-core'
import { FormSubmitButton } from '../../components/Form'

export type SendSiacoinFormData = {
  address: string
  siacoin: BigNumber
  includeFee: boolean
}

type Step = 'setup' | 'confirm' | 'done'

const fee = toHastings(0.00393)

const emptyFormData = {
  address: '',
  siacoin: new BigNumber(0),
  includeFee: false,
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSiacoinDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const [step, setStep] = useState<Step>('setup')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signedTxn, setSignedTxn] = useState<Transaction>()
  const [formData, setFormData] = useState<SendSiacoinFormData>(emptyFormData)

  // Form for each step
  const generate = useSendSiacoinGenerateForm({
    fee,
    onComplete: (data) => {
      setFormData(data)
      setStep('confirm')
    },
  })
  const confirm = useSendSiacoinConfirmForm({
    fee,
    formData,
    onConfirm: ({ transaction }) => {
      setSignedTxn(transaction)
      setStep('done')
    },
  })

  const controls = useMemo(() => {
    if (step === 'setup') {
      return {
        submitLabel: 'Generate transaction',
        formik: generate.formik,
      }
    }
    if (step === 'confirm') {
      return {
        submitLabel: 'Broadcast transaction',
        formik: confirm.formik,
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
          generate.formik.resetForm()
          confirm.formik.resetForm()
          setStep('setup')
        }
        onOpenChange(val)
      }}
      title="Send siacoin"
      onSubmit={
        controls
          ? (controls.formik
              .handleSubmit as React.FormEventHandler<HTMLFormElement>)
          : undefined
      }
      controls={
        controls && (
          <div className="flex flex-col gap-1">
            <FormSubmitButton formik={controls.formik}>
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
        {step === 'setup' && generate.form}
        {step === 'confirm' && confirm.form}
        {step === 'done' && (
          <WalletSendSiacoinComplete
            formData={formData}
            fee={fee}
            transactionId={'TODO'}
          />
        )}
      </div>
    </Dialog>
  )
}
