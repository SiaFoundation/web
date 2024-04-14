import {
  Link,
  ScrollArea,
  Text,
  ValueCopyable,
  ValueMenu,
  ValueNum,
  ValueSc,
} from '@siafoundation/design-system'
import { useHost, useSlabObjects } from '@siafoundation/renterd-react'
import { HostContextMenu } from '../../components/Hosts/HostContextMenu'
import { useFilesManager } from '../filesManager'
import { useDialog } from '../dialog'
import { getDirectorySegmentsFromPath } from '../../lib/paths'
import BigNumber from 'bignumber.js'
import { ContractContextMenuFromId } from '../../components/Contracts/ContractContextMenuFromId'
import { AccountContextMenu } from '../../components/AccountContextMenu'

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
            size="12"
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
          <ValueCopyable
            size="12"
            value={value}
            label="account ID"
            contextMenu={
              <AccountContextMenu
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
            size="12"
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
              slab key
            </Text>
            <ValueCopyable size="12" value={value} label="slab key" />
          </div>
          {!!objects.data?.length && (
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
        <ValueCopyable
          size="12"
          value={value}
          label="account"
          contextMenu={
            <AccountContextMenu
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
    ),
  },
  lostSectors: {
    render: ({ value }: { value: number }) => (
      <div className="flex justify-between w-full gap-2">
        <Text size="12" color="subtle" ellipsis>
          lost sectors
        </Text>
        <ValueNum
          size="12"
          variant="value"
          value={new BigNumber(value)}
          format={(value) => value.toString()}
        />
      </div>
    ),
  },
}
