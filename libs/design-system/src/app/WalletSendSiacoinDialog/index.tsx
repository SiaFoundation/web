import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { toHastings } from '@siafoundation/sia-js'
import { Flex, DialogContent, Separator, Box, Dialog } from '../../core'
import { useSendSiacoinGenerateForm } from './Generate'
import { useSendSiacoinConfirmForm } from './Confirm'
import { ProgressSteps } from './ProgressSteps'
import { WalletSendSiacoinComplete } from './Complete'
import { Transaction } from '@siafoundation/react-core'
import { FormSubmitButton } from '../../components'

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
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSiacoinDialog({ open, onOpenChange }: Props) {
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
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          generate.formik.resetForm()
          confirm.formik.resetForm()
          setStep('setup')
        }
        onOpenChange(val)
      }}
    >
      <DialogContent
        title="Send siacoin"
        css={{
          maxWidth: '400px',
          overflow: 'hidden',
        }}
        onSubmit={
          controls
            ? (controls.formik
                .handleSubmit as React.FormEventHandler<HTMLFormElement>)
            : undefined
        }
        controls={
          controls && (
            <Flex direction="column" gap="0-5">
              <FormSubmitButton formik={controls.formik}>
                {controls.submitLabel}
              </FormSubmitButton>
            </Flex>
          )
        }
      >
        <Flex direction="column" gap="2">
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
          <Box css={{ marginTop: '$2' }}>
            <Separator size="100" pad="0" />
          </Box>
          {step === 'setup' && generate.form}
          {step === 'confirm' && confirm.form}
          {step === 'done' && (
            <WalletSendSiacoinComplete
              formData={formData}
              fee={fee}
              transactionId={'TODO'}
            />
          )}
        </Flex>
      </DialogContent>
    </Dialog>
  )
}
