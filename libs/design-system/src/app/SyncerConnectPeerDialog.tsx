'use client'

import { Paragraph } from '../core/Paragraph'
import { triggerToast } from '../lib/toast'
import {
  FormFieldFormik,
  FormSubmitButtonFormik,
} from '../components/FormFormik'
import { Response } from '@siafoundation/react-core'
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

export type SyncerConnectPeerDialogParams = void

type Props = {
  params?: SyncerConnectPeerDialogParams
  trigger?: React.ReactNode
  open: boolean
  connect: (address: string) => Promise<Response<void>>
  onOpenChange: (val: boolean) => void
}

export function SyncerConnectPeerDialog({
  trigger,
  open,
  connect,
  onOpenChange,
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const netAddress = `${values.ip}:${values.port}`
      const response = await connect(netAddress)
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
            <FormFieldFormik
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
            <FormFieldFormik
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
            <FormSubmitButtonFormik formik={formik} size="medium">
              Connect
            </FormSubmitButtonFormik>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
