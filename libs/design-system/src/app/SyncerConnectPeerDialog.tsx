import { Paragraph } from '../core/Paragraph'
import { triggerToast } from '../lib/toast'
import { FormField, FormSubmitButton } from '../components/Form'
import { useSyncerConnect } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { hostnameOrIpRegex } from '../lib/ipRegex'
import { Dialog } from '../core/Dialog'

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
      hostnameOrIpRegex().test(v || '')
    ),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function SyncerConnectPeerDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
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
        triggerToast('Connected to peer')
        actions.resetForm()
        onOpenChange(false)
      }
    },
  })

  return (
    <Dialog
      trigger={trigger}
      title="Connect peer"
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          formik.resetForm()
        }
        onOpenChange(open)
      }}
      contentVariants={{
        className: 'w-[400px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">Connect to a peer by IP address.</Paragraph>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField
              formik={formik}
              title="Address"
              name="ip"
              placeholder="host.acme.com or 127.0.0.1"
              autoComplete="off"
              type="text"
              variants={{
                size: 'medium',
              }}
            />
            <FormField
              formik={formik}
              title="Port"
              name="port"
              disableGroupSeparators
              placeholder="9981"
              autoComplete="off"
              type="number"
              variants={{
                size: 'medium',
              }}
            />
            <FormSubmitButton formik={formik} size="medium">
              Connect
            </FormSubmitButton>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
