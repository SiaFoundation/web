import {
  Button,
  Link,
  ScrollArea,
  Text,
  Tooltip,
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
import { ChurnEventsField } from './ChurnEventsField'
import { AlertData } from '@siafoundation/renterd-types'
import { getFileHealth } from '../../lib/fileHealth'
import { getHostAddress } from '../../lib/host'

export const dataFields: {
  [K in keyof AlertData]: {
    render: (props: {
      value: NonNullable<AlertData[K]>
    }) => React.JSX.Element | null
  }
} = {
  origin: {
    render({ value }) {
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
    render({ value }) {
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
    render({ value }) {
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
    render: function HostKey({ value }) {
      const host = useHost({ params: { hostkey: value } })
      if (!host.data) {
        return null
      }
      const address = getHostAddress(host.data)
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
                address={address}
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
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            slab key
          </Text>
          <ValueCopyable size="12" value={value} label="slab key" />
        </div>
      )
    },
  },
  health: {
    render({ value }) {
      return (
        <div className="flex justify-between items-center w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            health
          </Text>
          <Text size="12" color="contrast" ellipsis>
            {value}
          </Text>
        </div>
      )
    },
  },
  objects: {
    render: function ObjectIDs({ value }) {
      const { setActiveDirectory } = useFilesManager()
      const { closeDialog } = useDialog()
      return (
        <div
          data-testid="objects"
          className="flex flex-col h-[150px] overflow-hidden"
        >
          <div className="flex justify-between items-center w-full gap-2">
            <Text size="12" color="subtle" ellipsis>
              objects
            </Text>
            <Text size="12" color="contrast" ellipsis>
              {value.length}
            </Text>
          </div>
          <div className="-mx-2 flex-1 overflow-hidden">
            <ScrollArea>
              <div className="flex flex-col gap-2 mt-2 mb-2 px-2">
                {value.map(({ bucket, key, health, size }) => {
                  const fullPath = `${bucket}${key}`
                  const { color, icon, label } = getFileHealth({
                    health,
                    size,
                    isDirectory: key.endsWith('/'),
                  })
                  return (
                    <div
                      key={fullPath}
                      className="flex justify-between items-center w-full gap-2"
                    >
                      <div className="flex gap-2 items-center">
                        <Tooltip content={label}>
                          <Text size="12" color={color}>
                            {icon}
                          </Text>
                        </Tooltip>
                        <Link
                          color="accent"
                          underline="hover"
                          size="12"
                          noWrap
                          ellipsis
                          onClick={() => {
                            setActiveDirectory(() =>
                              getDirectorySegmentsFromPath(fullPath),
                            )
                            closeDialog()
                          }}
                        >
                          {fullPath}
                        </Link>
                      </div>
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
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      )
    },
  },
  added: {
    render({ value }) {
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
    },
  },
  removed: {
    render({ value }) {
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
    },
  },
  migrationsInterrupted: {
    render({ value }) {
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
    },
  },
  balance: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            balance
          </Text>
          <ValueSc size="12" variant="value" value={new BigNumber(value)} />
        </div>
      )
    },
  },
  address: {
    render({ value }) {
      return (
        <div className="flex justify-between w-full gap-2">
          <Text size="12" color="subtle" ellipsis>
            address
          </Text>
          <ValueCopyable size="12" value={value} type="address" />
        </div>
      )
    },
  },
  account: {
    render({ value }) {
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
    },
  },
  lostSectors: {
    render({ value }) {
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
    },
  },
  churn: {
    render({ value }) {
      return <ChurnEventsField data={value} />
    },
  },
}
