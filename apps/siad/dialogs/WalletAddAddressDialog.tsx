import {
  Paragraph,
  Button,
  Text,
  FormField,
  Dialog,
} from '@siafoundation/design-system'
import { useWalletAddressCreate } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { useDialog } from '../contexts/dialog'
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
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletAddAddressDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
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
    <Dialog
      title="Add address"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'max-w-[1000px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">Add an address to cold storage wallet.</Paragraph>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField
              formik={formik}
              title="Address"
              name="address"
              placeholder={exampleAddr}
              autoComplete="off"
              type="text"
            />
            <FormField
              formik={formik}
              title="Description"
              name="description"
              placeholder="My address"
              autoComplete="off"
              type="text"
            />
            <FormField
              formik={formik}
              title="Index"
              name="index"
              placeholder="0"
              type="number"
            />
            {formik.status?.error && (
              <Text color="red">{formik.status.error}</Text>
            )}
            <Button size="medium" variant="accent" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
