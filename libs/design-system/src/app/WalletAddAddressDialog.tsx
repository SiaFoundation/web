import { Paragraph } from '../core/Paragraph'
import { TextField } from '../core/TextField'
import { Button } from '../core/Button'
import { Label } from '../core/Label'
import { Text } from '../core/Text'
import { useWalletAddressCreate } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const exampleAddr =
  'addr:e3b1050aef388438668b52983cf78f40925af8f0aa8b9de80c18eadcefce8388d168a313e3f2'

const initialValues = {
  address: '',
  description: '',
  index: 0,
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  index: Yup.number().integer().required('Required'),
})

type Props = {
  closeDialog: () => void
}

export function WalletAddAddressDialog({ closeDialog }: Props) {
  const addAddress = useWalletAddressCreate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const response = await addAddress.post({
        param: values.address,
        payload: {
          index: values.index || 0,
          description: values.description || '',
        },
      })
      if (response.status !== 200) {
        actions.setStatus(response)
      } else {
        actions.resetForm()
        closeDialog()
      }
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <Paragraph size="14">Add an address to cold storage wallet.</Paragraph>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Field
            formik={formik}
            title="Address"
            name="address"
            placeholder={exampleAddr}
            autoComplete="off"
            type="text"
          />
          <Field
            formik={formik}
            title="Description"
            name="description"
            placeholder="My address"
            autoComplete="off"
            type="text"
          />
          <Field
            formik={formik}
            title="Index"
            name="index"
            placeholder="0"
            type="number"
          />
          {formik.status?.error && (
            <Text color="red">{formik.status.error}</Text>
          )}
          <Button size="large" variant="accent" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
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
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Label htmlFor={name} color="subtle">
          {title}
        </Label>
        {formik.errors[name] && formik.touched[name] && (
          <Text color="red">{formik.errors[name]}</Text>
        )}
      </div>
      <TextField
        id={name}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        type={type}
        onChange={formik.handleChange}
        value={formik.values[name]}
        size="medium"
      />
    </div>
  )
}
