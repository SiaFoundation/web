import {
  Button,
  Document16,
  FolderIcon,
  LoadingDots,
  TableColumn,
  Text,
  ValueNum,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { FileContextMenu } from '../../components/Files/FileContextMenu'
import { DirectoryContextMenu } from '../../components/Files/DirectoryContextMenu'
import BigNumber from 'bignumber.js'
import { useFiles } from '.'
import { ObjectData, TableColumnId } from './types'
import { FilesHealthColumn } from '../../components/Files/Columns/FilesHealthColumn'

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
    render: function TypeColumn({
      data: { isUploading, isDirectory, name, path, size },
    }) {
      const { setActiveDirectory } = useFiles()
      if (isUploading) {
        return (
          <Button variant="ghost" state="waiting">
            <Document16 />
          </Button>
        )
      }
      if (name === '..') {
        return (
          <Button
            variant="ghost"
            icon="hover"
            onClick={(e) => {
              e.stopPropagation()
              setActiveDirectory((p) => p.slice(0, -1))
            }}
          >
            <FolderIcon size={16} />
          </Button>
        )
      }
      return isDirectory ? (
        <DirectoryContextMenu path={path} size={size} />
      ) : (
        <FileContextMenu name={name} path={path} />
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
    render: function HealthColumn({ data }) {
      return <FilesHealthColumn {...data} />
    },
  },
]
