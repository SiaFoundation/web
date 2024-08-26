'use client'

import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { Separator } from '../../core/Separator'
import { Dialog } from '../../core/Dialog'
import { useSendSiacoinGenerateForm } from './Generate'
import { useSendSiacoinConfirmForm } from './Confirm'
import { ProgressSteps } from '../ProgressSteps'
import { WalletSendSiacoinComplete } from './Complete'
import { FormSubmitButtonFormik } from '../../components/FormFormik'
import { SendSiacoinFormData } from './types'

type Step = 'setup' | 'confirm' | 'done'

const emptyFormData: SendSiacoinFormData = {
  address: '',
  hastings: new BigNumber(0),
  includeFee: false,
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
  balance?: BigNumber
  fee: BigNumber
  send: (
    params: SendSiacoinFormData
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
  const [formData, setFormData] = useState<SendSiacoinFormData>(emptyFormData)

  // Form for each step
  const generate = useSendSiacoinGenerateForm({
    balance,
    fee,
    onComplete: (data) => {
      setFormData(data)
      setStep('confirm')
    },
  })
  const confirm = useSendSiacoinConfirmForm({
    fee,
    formData,
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
            <FormSubmitButtonFormik formik={controls.formik}>
              {controls.submitLabel}
            </FormSubmitButtonFormik>
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
            data={formData}
            fee={fee}
            transactionId={signedTxnId}
          />
        )}
      </div>
    </Dialog>
  )
}
