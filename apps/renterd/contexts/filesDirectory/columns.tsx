import {
  Button,
  LoadingDots,
  Text,
  Tooltip,
  ValueNum,
} from '@siafoundation/design-system'
import {
  Document16,
  Earth16,
  FolderIcon,
  Locked16,
} from '@siafoundation/react-icons'
import { humanBytes } from '@siafoundation/units'
import { FileContextMenu } from '../../components/Files/FileContextMenu'
import { DirectoryContextMenu } from '../../components/Files/DirectoryContextMenu'
import BigNumber from 'bignumber.js'
import { FilesHealthColumn } from '../../components/Files/Columns/FilesHealthColumn'
import { BucketContextMenu } from '../../components/Files/BucketContextMenu'
import { FilesTableColumn } from '../filesManager/types'
import { useFilesManager } from '../filesManager'

export const columns: FilesTableColumn[] = [
  {
    id: 'type',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-2 [&+*]:!pl-0',
    render: function TypeColumn({
      data: { isUploading, type, name, path, size },
    }) {
      const { setActiveDirectory } = useFilesManager()
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
      return type === 'bucket' ? (
        <BucketContextMenu name={name} />
      ) : type === 'directory' ? (
        <DirectoryContextMenu path={path} size={size} />
      ) : (
        <FileContextMenu path={path} />
      )
    },
  },
  {
    id: 'name',
    label: 'name',
    category: 'general',
    contentClassName: 'max-w-[600px]',
    render: function NameColumn({ data: { name, type } }) {
      const { setActiveDirectoryAndFileNamePrefix, setActiveDirectory } =
        useFilesManager()
      if (type === 'bucket') {
        return (
          <Text
            ellipsis
            color="accent"
            weight="semibold"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setActiveDirectoryAndFileNamePrefix([name], '')
            }}
          >
            {name}
          </Text>
        )
      }
      if (type === 'directory') {
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
    id: 'readAccess',
    label: 'public read access',
    contentClassName: 'justify-center',
    render: function ReadAccessColumn({ data }) {
      if (data.name === '..') {
        return null
      }
      const isPublic = data.bucket?.policy?.publicReadAccess
      return (
        <Tooltip
          content={
            isPublic
              ? 'The bucket policy allows public read access.'
              : 'The bucket policy only allows private read access.'
          }
        >
          <div>
            <Button variant="ghost" state="waiting">
              <Text
                color={isPublic ? 'contrast' : 'verySubtle'}
                className="flex gap-0.5 items-center"
              >
                {isPublic ? <Earth16 /> : <Locked16 />}
              </Text>
            </Button>
          </div>
        </Tooltip>
      )
    },
  },
  {
    id: 'size',
    label: 'size',
    contentClassName: 'justify-end',
    render: function SizeColumn({ data: { type, name, size, isUploading } }) {
      if (type === 'bucket') {
        return null
      }
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
          weight="regular"
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
      if (data.type === 'bucket') {
        return null
      }
      return <FilesHealthColumn {...data} />
    },
  },
]
