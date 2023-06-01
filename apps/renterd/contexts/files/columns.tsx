import {
  Button,
  CheckmarkFilled16,
  Document16,
  FolderIcon,
  HoverCard,
  LoadingDots,
  Misuse16,
  ScrollArea,
  Separator,
  TableColumn,
  Text,
  ValueNum,
  WarningFilled16,
} from '@siafoundation/design-system'
import { useObject } from '@siafoundation/react-renterd'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import { FileDropdownMenu } from '../../components/Files/FileDropdownMenu'
import BigNumber from 'bignumber.js'
import { sortBy } from 'lodash'
import { useFiles } from '.'
import { useContracts } from '../contracts'
import { ObjectData, TableColumnId } from './types'
import { getObjectHealth } from './health'

type Context = {
  currentHeight: number
  contractsTimeRange: {
    startHeight: number
    endHeight: number
  }
}

type FilesTableColumn = TableColumn<TableColumnId, ObjectData, Context> & {
  fixed?: boolean
  category?: string
}

export const columns: FilesTableColumn[] = [
  {
    id: 'type',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-2 [&+*]:!pl-0',
    render: ({ data: { isUploading, isDirectory, name, path } }) => {
      if (isUploading) {
        return (
          <Button variant="ghost" state="waiting">
            <Document16 />
          </Button>
        )
      }
      return isDirectory ? (
        // TODO: renable once actual child file deletion is implemented
        // <DirectoryDropdownMenu name={name} path={path} />
        <Button variant="ghost" state="waiting">
          <FolderIcon size={16} />
        </Button>
      ) : (
        <FileDropdownMenu name={name} path={path} />
      )
    },
  },
  {
    id: 'name',
    label: 'name',
    category: 'general',
    contentClassName: 'max-w-[600px]',
    render: function NameColumn({ data: { name, isDirectory } }) {
      const { setActiveDirectory } = useFiles()
      if (isDirectory) {
        if (name === '..') {
          return (
            <Text
              ellipsis
              color="accent"
              weight="semibold"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setActiveDirectory((p) => p.slice(0, -1))
              }}
            >
              {name}
            </Text>
          )
        }
        return (
          <Text
            ellipsis
            color="accent"
            weight="semibold"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setActiveDirectory((p) => p.concat(name.slice(0, -1)))
            }}
          >
            {name}
          </Text>
        )
      }
      return (
        <Text ellipsis weight="semibold">
          {name}
        </Text>
      )
    },
  },
  {
    id: 'size',
    label: 'size',
    contentClassName: 'justify-end',
    render: function SizeColumn({ data: { name, size, isUploading } }) {
      if (isUploading) {
        return <LoadingDots />
      }

      if (name === '..') {
        return null
      }

      return (
        <ValueNum
          size="12"
          value={new BigNumber(size)}
          variant="value"
          color="subtle"
          format={(v) => humanBytes(v.toNumber())}
        />
      )
    },
  },
  {
    id: 'health',
    label: 'health',
    contentClassName: 'justify-center',
    render: function SizeColumn({ data: { path, isUploading, isDirectory } }) {
      const { dataset: allContracts } = useContracts()
      const obj = useObject({
        disabled: isUploading || isDirectory,
        params: {
          key: path.slice(1),
        },
        config: {
          swr: {
            dedupingInterval: 5000,
          },
        },
      })
      if (isUploading) {
        return <LoadingDots />
      }

      if (obj.data?.object && allContracts) {
        const { health, slabs } = getObjectHealth(obj.data.object, allContracts)

        let label = 'excellent'
        let color: React.ComponentProps<typeof Text>['color'] = 'green'
        let icon = <CheckmarkFilled16 />
        if (health < 1) {
          label = 'good'
          color = 'green'
          icon = <CheckmarkFilled16 />
        }
        if (health < 0.5) {
          label = 'poor'
          color = 'amber'
          icon = <WarningFilled16 />
        }
        if (health < 0) {
          label = 'bad'
          color = 'red'
          icon = <Misuse16 />
        }
        return (
          <HoverCard
            rootProps={{
              openDelay: 100,
            }}
            trigger={
              <Text color={color} className="flex cursor-pointer">
                {icon}
              </Text>
            }
          >
            <div
              className="z-10 flex flex-col pb-1 -mx-1 overflow-hidden"
              style={{
                height: slabs.length > 15 ? '300px' : undefined,
              }}
            >
              <div className="px-2">
                <Text size="12">{`${label} health (${(health * 100).toFixed(
                  0
                )}%)`}</Text>
              </div>
              <div className="px-2">
                <Separator className="w-full mt-0.5 mb-1.5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <ScrollArea>
                  <div className="px-2">
                    {sortBy(slabs, 'contractShards').map((slab) => (
                      <div key={slab.index} className="flex justify-between">
                        <Text
                          size="12"
                          color="subtle"
                          className="flex items-center"
                        >
                          Slab {slab.index}:
                        </Text>
                        <Text
                          size="12"
                          color="subtle"
                          className="flex items-center"
                        >
                          {slab.contractShards}/{slab.totalShards}
                        </Text>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </HoverCard>
        )
      }
      return null
    },
  },
  {
    id: 'slabs',
    label: 'slabs',
    contentClassName: 'justify-end',
    render: function SlabsColumn({ data: { path, isUploading, isDirectory } }) {
      const obj = useObject({
        disabled: isUploading || isDirectory,
        params: {
          key: path.slice(1),
        },
        config: {
          swr: {
            dedupingInterval: 5000,
          },
        },
      })
      if (isUploading) {
        return <LoadingDots />
      }
      if (obj.data?.object) {
        return (
          <ValueNum
            size="12"
            value={new BigNumber(obj.data?.object.slabs.length || 0)}
            variant="value"
            color="subtle"
            format={(v) => humanNumber(v)}
          />
        )
      }
      return null
    },
  },
  {
    id: 'shards',
    label: 'shards',
    contentClassName: 'justify-end',
    render: function SlabsColumn({ data: { path, isUploading, isDirectory } }) {
      const obj = useObject({
        disabled: isUploading || isDirectory,
        params: {
          key: path.slice(1),
        },
        config: {
          swr: {
            dedupingInterval: 5000,
          },
        },
      })
      if (isUploading) {
        return <LoadingDots />
      }
      if (obj.data?.object) {
        return (
          <ValueNum
            size="12"
            value={
              new BigNumber(
                obj.data?.object.slabs?.reduce(
                  (acc, slab) => acc + slab.shards?.length,
                  0
                ) || 0
              )
            }
            variant="value"
            color="subtle"
            format={(v) => humanNumber(v)}
          />
        )
      }
      return null
    },
  },
]
