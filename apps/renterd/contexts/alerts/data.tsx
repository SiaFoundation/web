import {
  Link,
  ScrollArea,
  Text,
  Tooltip,
  ValueCopyable,
  ValueMenu,
  ValueSc,
} from '@siafoundation/design-system'
import { useHost, useSlabObjects } from '@siafoundation/react-renterd'
import { HostContextMenu } from '../../components/Hosts/HostContextMenu'
import { useFilesManager } from '../filesManager'
import { useDialog } from '../dialog'
import { getDirectorySegmentsFromPath } from '../../lib/paths'
import BigNumber from 'bignumber.js'
import { HostContextMenuFromKey } from '../../components/Hosts/HostContextMenuFromId'
import { ContractContextMenuFromId } from '../../components/Contracts/ContractContextMenuFromId'
import { humanBytes } from '@siafoundation/units'
import { formatRelative } from 'date-fns'

export const dataFields: Record<
  string,
  { render: (props: { value: unknown }) => JSX.Element }
> = {
  origin: {
    render: function OriginField({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            origin
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    },
  },
  contractID: {
    render: function ContractField({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
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
          <Text size="12" color="subtle" ellipsis>
            account ID
          </Text>
          <ValueCopyable size="12" value={value} label="account ID" />
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
          <Text size="12" color="subtle" ellipsis>
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
      const { setActiveDirectory } = useFilesManager()
      const { closeDialog } = useDialog()
      const objects = useSlabObjects({
        params: {
          key: value,
        },
        config: {
          swr: {
            revalidateOnFocus: false,
          },
        },
      })
      return (
        <div className="flex flex-col gap-2 max-h-[100px]">
          <div className="flex justify-between w-full gap-2">
            <Text size="12" color="subtle" ellipsis>
              key
            </Text>
            <ValueCopyable size="12" value={value} />
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
        </div>
      )
    },
  },
  added: {
    render: ({ value }: { value: number }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          added
        </Text>
        <Text size="12" color="contrast" ellipsis>
          {value}
        </Text>
      </div>
    ),
  },
  removed: {
    render: ({ value }: { value: number }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          removed
        </Text>
        <Text size="12" color="contrast" ellipsis>
          {value}
        </Text>
      </div>
    ),
  },
  setAdditions: {
    render: function AdditionsField({
      value,
    }: {
      value: Record<
        string,
        {
          hostKey: string
          additions: { size: number; time: string }[]
        }
      >
    }) {
      return (
        <div className="flex flex-col gap-2">
          <Text size="12" color="subtle" ellipsis>
            contract set additions
          </Text>
          {value && (
            <div className="flex flex-col gap-3 mb-2">
              {Object.entries(value).map(
                ([contractId, { hostKey, additions }], i) => (
                  <ContractSetChange
                    key={contractId}
                    contractId={contractId}
                    hostKey={hostKey}
                    changes={additions}
                    i={i}
                  />
                )
              )}
            </div>
          )}
        </div>
      )
    },
  },
  setRemovals: {
    render: function RemovalsField({
      value,
    }: {
      value: Record<
        string,
        {
          hostKey: string
          removals: { reasons: string; size: number; time: string }[]
        }
      >
    }) {
      return (
        <div className="flex flex-col gap-2">
          <Text size="12" color="subtle" ellipsis>
            contract set removals
          </Text>
          {value && (
            <div className="flex flex-col gap-3 mb-2">
              {Object.entries(value).map(
                ([contractId, { hostKey, removals }], i) => (
                  <ContractSetChange
                    key={contractId}
                    contractId={contractId}
                    hostKey={hostKey}
                    changes={removals}
                    i={i}
                  />
                )
              )}
            </div>
          )}
        </div>
      )
    },
  },
  migrationsInterrupted: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          migrations interrupted
        </Text>
        <Text size="12" weight="medium" ellipsis>
          {value ? 'yes' : 'no'}
        </Text>
      </div>
    ),
  },
  allowance: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          allowance
        </Text>
        <ValueSc size="12" variant="value" value={new BigNumber(value)} />
      </div>
    ),
  },
  balance: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          balance
        </Text>
        <ValueSc size="12" variant="value" value={new BigNumber(value)} />
      </div>
    ),
  },
  address: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          address
        </Text>
        <ValueCopyable size="12" value={value} type="address" />
      </div>
    ),
  },
  account: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          account
        </Text>
        <ValueCopyable size="12" value={value} />
      </div>
    ),
  },
}

function ContractSetChange({
  contractId,
  hostKey,
  changes,
  i,
}: {
  contractId: string
  hostKey: string
  changes: { reasons?: string; size: number; time: string }[]
  i: number
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between">
        <Text size="12" ellipsis>
          {i + 1}.
        </Text>
        <div className="flex gap-2">
          <Text size="12" color="subtle" ellipsis>
            contract
          </Text>
          <ValueCopyable
            size="12"
            value={contractId}
            contextMenu={
              <ContractContextMenuFromId
                id={contractId}
                contentProps={{
                  align: 'end',
                }}
              />
            }
          />
        </div>
        <div className="flex gap-2">
          <Text size="12" color="subtle" ellipsis>
            host
          </Text>
          <ValueCopyable
            size="12"
            value={hostKey}
            label="host key"
            contextMenu={
              <HostContextMenuFromKey
                hostKey={hostKey}
                contentProps={{
                  align: 'end',
                }}
              />
            }
          />
        </div>
      </div>
      {changes.map(({ reasons, size, time }) => (
        <div key={reasons + time} className="flex gap-2 justify-between">
          <Tooltip content={reasons}>
            <Text size="12" ellipsis>
              {reasons}
            </Text>
          </Tooltip>
          <div className="flex-1" />
          <div className="flex gap-2">
            <Text size="12" color="subtle" ellipsis>
              time
            </Text>
            <Text size="12" ellipsis>
              {formatRelative(new Date(), new Date(time))}
            </Text>
          </div>
          <div className="flex gap-2">
            <Text size="12" color="subtle" ellipsis>
              size
            </Text>
            <Text size="12" ellipsis>
              {humanBytes(size)}
            </Text>
          </div>
        </div>
      ))}
    </div>
  )
}
