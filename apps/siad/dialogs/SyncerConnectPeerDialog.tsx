import {
  Flex,
  Paragraph,
  Button,
  Text,
  DialogContent,
  triggerToast,
} from '@siafoundation/design-system'
import { useSyncerConnect } from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { useDialog } from '../contexts/dialog'
import * as Yup from 'yup'
import { FormField } from '../components/Field'
import { ipRegex } from './ipRegex'

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
    .test('ip', 'Invalid IP address', (v) =>
      ipRegex.v4({ exact: true }).test(v)
    ),
})

export function SyncerConnectPeerDialog() {
  const { closeDialog } = useDialog()
  const connect = useSyncerConnect()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const netAddress = `${values.ip}:${values.port}`
      const response = await connect.post({
        payload: {
          netAddress,
        },
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
        closeDialog()
      }
    },
  })

  return (
    <DialogContent
      title="Connect Peer"
      css={{
        maxWidth: '400px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <Paragraph size="14">Connect to a peer by IP address.</Paragraph>
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="2">
            <FormField
              formik={formik}
              title="IP"
              name="ip"
              placeholder="127.0.0.1"
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
              <Text css={{ color: '$red11' }}>{formik.status.error}</Text>
            )}
            <Button
              size="2"
              disabled={formik.isSubmitting || !formik.isValid}
              variant="accent"
              state={formik.isSubmitting ? 'waiting' : undefined}
              type="submit"
            >
              Connect
            </Button>
          </Flex>
        </form>
      </Flex>
    </DialogContent>
  )
}
