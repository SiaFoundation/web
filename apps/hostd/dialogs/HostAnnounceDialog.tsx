import {
  Paragraph,
  Button,
  Text,
  Bullhorn20,
  triggerToast,
  hostnameOrIpRegex,
  FormField,
  Dialog,
} from '@siafoundation/design-system'
import { useSyncerConnect } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { useDialog } from '../contexts/dialog'
import * as Yup from 'yup'

const initialValues = {
  port: 9981,
  ip: '',
}

const validationSchema = Yup.object().shape({
  port: Yup.number()
    .required('Required')
    .min(0, 'Out of valid range')
    .max(65535, 'Out of valid range'),
  ip: Yup.string()
    .required('Required')
    .test('ip', 'Invalid hostname or IP address', (v) =>
      hostnameOrIpRegex().test(v)
    ),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function HostAnnounceDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const connect = useSyncerConnect()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const netAddress = `${values.ip}:${values.port}`
      const response = await connect.post({
        payload: netAddress,
      })
      if (response.error) {
        const formattedError = response.error.replace(
          `invalid peer address: address ${netAddress}:`,
          ''
        )
        actions.setStatus({ error: formattedError })
      } else {
        triggerToast('Host announced to network')
        actions.resetForm()
        closeDialog()
      }
    },
  })

  return (
    <Dialog
      title="Announce host"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'max-w-[400px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">Announce this host to the network.</Paragraph>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField
              formik={formik}
              title="Address"
              name="ip"
              placeholder="host.acme.com or 127.0.0.1"
              autoComplete="off"
              type="text"
            />
            <FormField
              formik={formik}
              title="Port"
              name="port"
              placeholder="9981"
              autoComplete="off"
              type="number"
            />
            {formik.status?.error && (
              <Text color="red">{formik.status.error}</Text>
            )}
            <Button
              size="medium"
              disabled={formik.isSubmitting || !formik.isValid}
              variant="accent"
              state={formik.isSubmitting ? 'waiting' : undefined}
              type="submit"
            >
              <Bullhorn20 />
              Announce
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
