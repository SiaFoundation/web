import {
  Dialog,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  ConfigFields,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useAdminHostImport } from '@siafoundation/indexd-react'
import { HostAddress } from '@siafoundation/indexd-types'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { normalizePublicKey } from '../lib/publicKey'
import { useHostsParams } from '../components/Data/Hosts/useHostsParams'

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

const defaultValues = {
  publicKey: '',
  siamuxAddress: '',
  quicAddress: '',
}

type Values = typeof defaultValues

const publicKeyPattern = /^ed25519:[0-9a-f]{64}$/

// indexd splits addresses with Go's net.SplitHostPort, so a host with colons
// must be in brackets and brackets are not allowed elsewhere. The port must be
// between 1 and 65535.
const addressPattern = /^(\[[^[\]]+\]|[^:[\]]+):(\d+)$/

function validateAddress(value: string) {
  const address = value.trim()
  if (!address) {
    return true
  }
  const match = address.match(addressPattern)
  const port = match ? Number(match[2]) : 0
  return (
    (match && port >= 1 && port <= 65535) ||
    'must be host:port, with IPv6 in brackets'
  )
}

function requireAnAddress(_: string, values: Values) {
  return (
    !!values.siamuxAddress.trim() ||
    !!values.quicAddress.trim() ||
    'enter a SiaMux or QUIC address'
  )
}

const fields: ConfigFields<Values, never> = {
  publicKey: {
    type: 'text',
    title: 'Public key',
    placeholder: 'ed25519:b050c0c6...',
    validation: {
      required: 'required',
      validate: {
        format: (value: string) =>
          publicKeyPattern.test(normalizePublicKey(value)) ||
          'must be an ed25519 public key',
      },
    },
  },
  siamuxAddress: {
    type: 'text',
    title: 'SiaMux address',
    placeholder: 'host.example.com:9984',
    trigger: ['quicAddress'],
    validation: {
      validate: {
        format: validateAddress,
        required: requireAnAddress,
      },
    },
  },
  quicAddress: {
    type: 'text',
    title: 'QUIC address',
    placeholder: 'host.example.com:9984',
    trigger: ['siamuxAddress'],
    validation: {
      validate: {
        format: validateAddress,
        required: requireAnAddress,
      },
    },
  },
}

export function HostImportDialog({ open, onOpenChange }: Props) {
  const hostImport = useAdminHostImport()
  const { setPanelId } = useHostsParams()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { closeAndReset, handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      const publicKey = normalizePublicKey(values.publicKey)
      const addresses: HostAddress[] = []
      if (values.siamuxAddress.trim()) {
        addresses.push({
          protocol: 'siamux',
          address: values.siamuxAddress.trim(),
        })
      }
      if (values.quicAddress.trim()) {
        addresses.push({ protocol: 'quic', address: values.quicAddress.trim() })
      }
      const response = await hostImport.post({
        payload: { publicKey, addresses },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Failed to add host',
          body: response.error,
        })
        return
      }
      triggerSuccessToast({
        title: 'Host added',
        body: 'It will be scanned within a few minutes.',
      })
      closeAndReset()
      // Open the host, since the default filters hide it until it is usable.
      setPanelId(publicKey)
    },
    [hostImport, closeAndReset, setPanelId],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Add host"
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Add a host by its public key and address. If the host is already
          known, its addresses are replaced. A later announcement from the host
          replaces them again.
        </Paragraph>
        <FieldText name="publicKey" form={form} fields={fields} />
        <FieldText name="siamuxAddress" form={form} fields={fields} />
        <FieldText name="quicAddress" form={form} fields={fields} />
        <FormSubmitButton form={form}>Add host</FormSubmitButton>
      </div>
    </Dialog>
  )
}
