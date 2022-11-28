import {
  Paragraph,
  Button,
  FormField,
  FieldGroup,
  Dialog,
} from '@siafoundation/design-system'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GenerateSeed } from './GenerateSeed'
import { useState } from 'react'
import { VerifySeed } from './VerifySeed'

const initialValues = {
  name: '',
  seed: '',
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required').max(10),
  seed: Yup.string().required('Required'),
})

export function NewWallet() {
  const seed =
    'dash rudely lunar balding zinger mystery feline catch ruling entrance portents makeup talent honked towel dabbing zones voice tucks iceberg both banjo weird ladder rumble tepid scamper fountain acumen'
  // const [seed, setSeed] = useState<string>()
  const [step, setStep] = useState<string>('start')
  const [valid, setValid] = useState<boolean>(false)

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Dialog
      title="Create a new wallet"
      contentVariants={{
        className: 'max-w-[1200px]',
      }}
      controls={
        <div className="flex gap-2">
          <Button size="medium" onClick={() => setStep('start')}>
            back
          </Button>
          <div className="flex-1" />
          <Button size="medium" onClick={() => null}>
            cancel
          </Button>
          {step === 'start' && (
            <Button
              size="medium"
              variant="accent"
              onClick={() => setStep('confirm')}
            >
              Confirm
            </Button>
          )}
          {step === 'confirm' && (
            <Button
              size="medium"
              variant="accent"
              type="submit"
              disabled={!valid}
              onClick={() => setStep('start')}
            >
              Add wallet
            </Button>
          )}
        </div>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4 mb-2">
          <Paragraph size="14" color="subtle">
            Generates a brand new seed and adds it as a hot wallet. The hot
            wallet will automatically sign transactions.
          </Paragraph>
          <FormField
            formik={formik}
            title="Name"
            name="name"
            placeholder="Give your wallet a name"
          />
        </div>
      </form>
      <FieldGroup title="Seed" name="seed" formik={formik}>
        {step === 'start' && <GenerateSeed seed={seed} onChange={() => null} />}
        {step === 'confirm' && (
          <VerifySeed seed={seed || ''} onChange={(valid) => setValid(valid)} />
        )}
      </FieldGroup>
    </Dialog>
  )
}
