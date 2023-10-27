import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertsDialog as DSAlertsDialog,
  Link,
  ScrollArea,
  Text,
  Tooltip,
  triggerErrorToast,
  triggerSuccessToast,
  ValueCopyable,
  ValueMenu,
  ValueSc,
} from '@siafoundation/design-system'
import {
  AlertSeverity,
  useAlerts,
  useAlertsDismiss,
  useHost,
  useSlabObjects,
} from '@siafoundation/react-renterd'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { ContractContextMenuFromId } from '../components/Contracts/ContractContextMenuFromId'
import { HostContextMenu } from '../components/Hosts/HostContextMenu'
import { useDialog } from '../contexts/dialog'
import { useFiles } from '../contexts/files'
import { getDirectorySegmentsFromPath } from '../contexts/files/paths'

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function AlertsDialog({ open, onOpenChange }: Props) {
  const alerts = useAlerts()
  const dismiss = useAlertsDismiss()

  const dismissOne = useCallback(
    async (id: string) => {
      const response = await dismiss.post({
        payload: [id],
      })
      if (response.error) {
        triggerErrorToast('Error dismissing alert.')
      } else {
        triggerSuccessToast('Alert has been dismissed.')
      }
    },
    [dismiss]
  )

  const dismissMany = useCallback(
    async (ids: string[], filter?: AlertSeverity) => {
      if (!alerts.data) {
        return
      }
      const response = await dismiss.post({
        payload: ids,
      })
      if (response.error) {
        triggerErrorToast(
          filter
            ? `Error dismissing all ${filter} alerts.`
            : 'Error dismissing all alerts.'
        )
      } else {
        triggerSuccessToast(
          filter
            ? `All ${filter} alerts have been dismissed.`
            : 'All alerts have been dismissed.'
        )
      }
    },
    [dismiss, alerts.data]
  )

  return (
    <DSAlertsDialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
      }}
      alerts={alerts}
      dataFieldOrder={dataFieldOrder}
      dataFields={dataFields}
      dismissMany={dismissMany}
      dismissOne={dismissOne}
    />
  )
}

const dataFieldOrder = [
  'hint',
  'error',
  'origin',
  'hostKey',
  'contractID',
  'accountID',
  'slabKey',
  'additions',
  'removals',
]

const dataFields: Record<
  string,
  { render: (props: { value: unknown }) => JSX.Element }
> = {
  contractID: {
    render: function ContractField({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text color="subtle" ellipsis>
            contract ID
          </Text>
          <ValueMenu
            value={value}
            menu={
              <ContractContextMenuFromId
                id={value}
                contentProps={{
                  align: 'end',
                }}
                buttonProps={{
                  size: 'none',
                }}
              />
            }
          />
        </div>
      )
    },
  },
  accountID: {
    render: function AccountField({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text color="subtle" ellipsis>
            account ID
          </Text>
          <ValueCopyable value={value} label="account ID" />
        </div>
      )
    },
  },
  hostKey: {
    render: function HostField({ value }: { value: string }) {
      const host = useHost({ params: { hostKey: value } })
      if (!host.data) {
        return null
      }
      return (
        <div className="flex justify-between w-full gap-2">
          <Text color="subtle" ellipsis>
            host key
          </Text>
          <ValueMenu
            value={value}
            menu={
              <HostContextMenu
                publicKey={host.data.publicKey}
                address={host.data.netAddress}
                contentProps={{
                  align: 'end',
                }}
                buttonProps={{
                  size: 'none',
                }}
              />
            }
          />
        </div>
      )
    },
  },
  slabKey: {
    render: function SlabField({ value }: { value: string }) {
      const { setActiveDirectory } = useFiles()
      const { closeDialog } = useDialog()
      const objects = useSlabObjects({
        params: {
          key: value,
        },
      })
      return (
        <>
          <div className="flex justify-between w-full gap-2">
            <Text color="subtle" ellipsis>
              key
            </Text>
            <ValueCopyable value={value} />
          </div>
          {objects.data && (
            <ScrollArea>
              <div className="flex flex-col gap-2 mt-2 mb-2">
                {objects.data.map((o) => (
                  <Link
                    key={o.name}
                    color="accent"
                    underline="hover"
                    size="12"
                    noWrap
                    onClick={() => {
                      setActiveDirectory(() =>
                        getDirectorySegmentsFromPath(o.name)
                      )
                      closeDialog()
                    }}
                  >
                    {o.name}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          )}
        </>
      )
    },
  },
  additions: {
    render: function AdditionsField({ value }: { value: string[] }) {
      return (
        <>
          <div className="flex justify-between w-full gap-2">
            <Text color="subtle" ellipsis>
              additions
            </Text>
          </div>
          {value && (
            <ScrollArea>
              <div className="flex flex-wrap gap-2 mb-2">
                {value.map((contractId) => (
                  <div key={contractId}>
                    <ValueCopyable value={contractId} label="contract ID" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </>
      )
    },
  },
  removals: {
    render: function RemovalsField({
      value,
    }: {
      value: Record<string, string>
    }) {
      return (
        <>
          <div className="flex justify-between w-full gap-2">
            <Text color="subtle" ellipsis>
              removals
            </Text>
          </div>
          {value && (
            <ScrollArea>
              <div className="flex flex-col gap-2 mb-2">
                {Object.entries(value).map(([contractId, reason]) => (
                  <div
                    key={contractId}
                    className="flex gap-2 justify-between w-full"
                  >
                    <ValueCopyable value={contractId} label="contract ID" />
                    <Tooltip content={reason}>
                      <Text color="subtle" ellipsis>
                        {reason}
                      </Text>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </>
      )
    },
  },
  error: {
    render: ({ value }: { value: string }) => (
      <div className="flex flex-col w-full gap-2">
        <Accordion type="single">
          <AccordionItem value="error" variant="ghost">
            <AccordionTrigger>
              <Text color="subtle" ellipsis>
                error
              </Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text color="contrast">{value}</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  hint: {
    render: ({ value }: { value: string }) => (
      <div className="flex flex-col w-full gap-2">
        <Text color="contrast">{value}</Text>
      </div>
    ),
  },
  allowance: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          allowance
        </Text>
        <ValueSc variant="value" value={new BigNumber(value)} />
      </div>
    ),
  },
  balance: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          balance
        </Text>
        <ValueSc variant="value" value={new BigNumber(value)} />
      </div>
    ),
  },
  address: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          address
        </Text>
        <ValueCopyable value={value} type="address" />
      </div>
    ),
  },
  account: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          account
        </Text>
        <ValueCopyable value={value} />
      </div>
    ),
  },
}
