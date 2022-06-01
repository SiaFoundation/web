import {
  Flex,
  Paragraph,
  TextField,
  Button,
  Label,
  Text,
  Box,
  DialogContent,
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
    onSubmit: (values, actions) => {
      console.log(values)
    },
  })

  return (
    <DialogContent
      title="Create a new wallet"
      css={{
        width: 'inherit',
        maxWidth: '1200px',
        overflow: 'hidden',
      }}
      controls={
        <Flex gap="1">
          <Button size="2" onClick={() => setStep('start')}>
            back
          </Button>
          <Box css={{ flex: 1 }} />
          <Button size="2" onClick={() => null}>
            cancel
          </Button>
          {step === 'start' && (
            <Button
              size="2"
              variant="accent"
              onClick={() => setStep('confirm')}
            >
              Confirm
            </Button>
          )}
          {step === 'confirm' && (
            <Button
              size="2"
              variant="accent"
              type="submit"
              disabled={!valid}
              onClick={() => setStep('start')}
            >
              Add wallet
            </Button>
          )}
        </Flex>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="2" css={{ marginBottom: '$1' }}>
          <Paragraph size="14" color="subtle">
            Generates a brand new seed and adds it as a hot wallet. The hot
            wallet will automatically sign transactions.
          </Paragraph>
          <Field
            formik={formik}
            title="Name"
            name="name"
            placeholder="Give your wallet a name"
          />
        </Flex>
      </form>
      <FieldGroup title="Seed" name="seed" formik={formik}>
        {step === 'start' && <GenerateSeed seed={seed} onChange={() => null} />}
        {step === 'confirm' && (
          <VerifySeed seed={seed || ''} onChange={(valid) => setValid(valid)} />
        )}
      </FieldGroup>
    </DialogContent>
  )
}

type FieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  title: string
  name: string
  placeholder: string
  autoComplete?: string
  type?: string
}

function Field({
  formik,
  title,
  name,
  placeholder,
  autoComplete,
  type,
}: FieldProps) {
  return (
    <FieldGroup formik={formik} title={title} name={name}>
      <TextField
        id={name}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        type={type}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
        size="2"
      />
    </FieldGroup>
  )
}

type FieldGroupProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  title: string
  name: string
  children: React.ReactNode
}

function FieldGroup({ formik, title, name, children }: FieldGroupProps) {
  return (
    <Flex direction="column" gap="1">
      <Flex justify="between">
        <Label htmlFor={name} css={{ color: '$gray9' }}>
          {title}
        </Label>
        {formik.errors[name] && formik.touched[name] && (
          <Text css={{ color: '$red11' }}>{formik.errors[name]}</Text>
        )}
      </Flex>
      {children}
    </Flex>
  )
}
