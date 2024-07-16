import {
  Button,
  type ConfigFields,
  FieldSelect,
  Paragraph,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import { Password16 } from '@siafoundation/react-icons'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { useLedger } from '../../contexts/ledger'
import {
  type TransportType,
  getSupportedTransports,
} from '../../contexts/ledger/types'
import { LedgerLayout } from './LedgerLayout'

const defaultValues = {
  transportType: '',
}

function getFields({
  supportedTransports,
}: {
  supportedTransports: string[]
}): ConfigFields<typeof defaultValues, never> {
  return {
    transportType: {
      type: 'select',
      title: 'Transport',
      placeholder: 'Select a transport',
      options: supportedTransports.map((t) => ({
        value: t,
        label: t,
      })),
      validation: {
        required: true,
      },
    },
  }
}

export function DeviceConnectForm({
  shouldVerify,
}: {
  shouldVerify?: boolean
}) {
  const { device, connect, verify, setError, waitingForUser } = useLedger()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const transport = form.watch('transportType')
  const connected = !!device
  const verified = !!device?.publicKey0

  const supportedTransports = useSWR<string[]>(
    'deviceConnect/supportedTransports',
    () => getSupportedTransports(),
    {
      revalidateOnFocus: false,
    },
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (supportedTransports.data) {
      form.setValue('transportType', supportedTransports.data[0])
      if (supportedTransports.data.length === 0) {
        setError(
          new Error(
            'This browser does not support connecting to Ledger devices, please use a different browser.',
          ),
        )
      }
    }
  }, [supportedTransports.data])

  const fields = getFields({
    supportedTransports: supportedTransports.data || [],
  })

  const runConnect = useCallback(async () => {
    if (!transport) {
      return
    }
    connect(transport as TransportType)
  }, [connect, transport])

  const runVerify = useCallback(async () => {
    if (!transport) {
      return
    }
    await verify()
  }, [verify, transport])

  return (
    <div className="flex flex-col gap-1">
      {connected ? (
        !shouldVerify ? (
          <LedgerLayout
            shouldVerify={shouldVerify}
            title={device.transport.deviceModel.productName}
          />
        ) : verified ? (
          <LedgerLayout
            shouldVerify={shouldVerify}
            title={device.transport.deviceModel.productName}
            details={
              <div className="flex flex-col gap-1">
                <ValueCopyable
                  value={device.publicKey0}
                  label="public key 0"
                  color="subtle"
                  maxLength={30}
                />
              </div>
            }
          />
        ) : (
          <LedgerLayout
            shouldVerify={shouldVerify}
            title={device.transport.deviceModel.productName}
            actions={
              <>
                <Button variant="accent" onClick={runVerify}>
                  <Password16 />
                  Verify
                </Button>
              </>
            }
            details={
              waitingForUser ? (
                <div className="flex flex-col gap-1">
                  <Text>Please confirm on device...</Text>
                  <Paragraph size="14" color="subtle">
                    To continue, approve public key verification on device.
                  </Paragraph>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <Paragraph size="14">
                    Unlock device, open the Sia app, and make sure Ledger Live
                    is closed. Then start wallet verification to continue.
                  </Paragraph>
                </div>
              )
            }
          />
        )
      ) : (
        <LedgerLayout
          shouldVerify={shouldVerify}
          title="Connect Ledger..."
          actions={
            supportedTransports.data?.length ? (
              <>
                <FieldSelect
                  name="transportType"
                  form={form}
                  fields={fields}
                  group={false}
                />
                <Button size="small" onClick={runConnect}>
                  Connect
                </Button>
              </>
            ) : null
          }
          details={
            waitingForUser ? (
              <div className="flex flex-col gap-1">
                <Text>Please confirm in browser and on device...</Text>
                <Paragraph size="14" color="subtle">
                  Connect your Ledger device. Make sure you unlock your Ledger
                  and open the Sia App before trying to connect.
                </Paragraph>
              </div>
            ) : (
              <Paragraph size="14" color="subtle">
                Connect your Ledger device. Make sure you unlock your Ledger and
                open the Sia App before trying to connect.
              </Paragraph>
            )
          }
        />
      )}
    </div>
  )
}
