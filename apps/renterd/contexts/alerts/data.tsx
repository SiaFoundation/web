import {
  Button,
  Link,
  ScrollArea,
  Text,
  ValueCopyable,
  ValueMenu,
  ValueNum,
  ValueSc,
} from '@siafoundation/design-system'
import { useHost } from '@siafoundation/renterd-react'
import { HostContextMenu } from '../../components/Hosts/HostContextMenu'
import { useFilesManager } from '../filesManager'
import { useDialog } from '../dialog'
import { getDirectorySegmentsFromPath } from '../../lib/paths'
import BigNumber from 'bignumber.js'
import { ContractContextMenuFromId } from '../../components/Contracts/ContractContextMenuFromId'
import { AccountContextMenu } from '../../components/AccountContextMenu'
import { FileContextMenu } from '../../components/Files/FileContextMenu'
import { CaretDown16 } from '@siafoundation/react-icons'

type Render = (props: { value: unknown }) => JSX.Element

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
    } as Render,
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
    } as Render,
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
    } as Render,
  },
  hostKey: {
    render: function HostField({ value }: { value: string }) {
      const host = useHost({ params: { hostkey: value } })
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
    } as Render,
  },
  slabKey: {
    render: function SlabField({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            slab key
          </Text>
          <ValueCopyable size="12" value={value} label="slab key" />
        </div>
      )
    } as Render,
  },
  health: {
    render: function OriginField({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            health
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    } as Render,
  },
  objectIDs: {
    render: function ObjectIdsField({
      value,
    }: {
      value: Record<string, string[]>
    }) {
      const { setActiveDirectory } = useFilesManager()
      const { closeDialog } = useDialog()
      return (
        <div className="flex flex-col gap-2 max-h-[100px]">
          <div className="flex justify-between w-full gap-2">
            <Text size="12" color="subtle" ellipsis>
              object IDs
            </Text>
          </div>
          <div className="-mx-2">
            <ScrollArea>
              <div className="flex flex-col gap-2 mt-2 mb-2 px-2">
                {Object.entries(value).map(([bucket, paths]) =>
                  paths.map((path) => {
                    const fullPath = `${bucket}${path}`
                    return (
                      <div
                        key={fullPath}
                        className="flex justify-between w-full gap-2"
                      >
                        <Link
                          color="accent"
                          underline="hover"
                          size="12"
                          noWrap
                          ellipsis
                          onClick={() => {
                            setActiveDirectory(() =>
                              getDirectorySegmentsFromPath(fullPath)
                            )
                            closeDialog()
                          }}
                        >
                          {fullPath}
                        </Link>
                        <FileContextMenu
                          path={fullPath}
                          contentProps={{
                            align: 'end',
                          }}
                          trigger={
                            <Button
                              aria-label="File context menu"
                              variant="ghost"
                              icon="hover"
                              size="none"
                            >
                              <CaretDown16 />
                            </Button>
                          }
                        />
                      </div>
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )
    } as Render,
  },
  added: {
    render: function Component({ value }: { value: number }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            added
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    } as Render,
  },
  removed: {
    render: function Component({ value }: { value: number }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            removed
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    } as Render,
  },
  migrationsInterrupted: {
    render: function Component({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            migrations interrupted
          </Text>
          <Text size="12" weight="medium" ellipsis>
            {value ? 'yes' : 'no'}
          </Text>
        </div>
      )
    } as Render,
  },
  allowance: {
    render: function Component({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            allowance
          </Text>
          <ValueSc size="12" variant="value" value={new BigNumber(value)} />
        </div>
      )
    } as Render,
  },
  balance: {
    render: function Component({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            balance
          </Text>
          <ValueSc size="12" variant="value" value={new BigNumber(value)} />
        </div>
      )
    } as Render,
  },
  address: {
    render: function Component({ value }: { value: string }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            address
          </Text>
          <ValueCopyable size="12" value={value} type="address" />
        </div>
      )
    } as Render,
  },
  account: {
    render: function Component({ value }: { value: string }) {
      return (
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
      )
    } as Render,
  },
  lostSectors: {
    render: function Component({ value }: { value: number }) {
      return (
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
      )
    } as Render,
  },
}
