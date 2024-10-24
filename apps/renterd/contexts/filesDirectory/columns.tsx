import {
  Button,
  Checkbox,
  ControlGroup,
  Text,
  Tooltip,
  ValueNum,
} from '@siafoundation/design-system'
import {
  Document16,
  Earth16,
  FolderIcon,
  Locked16,
  Upload16,
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
    contentClassName: '!pl-3 !pr-4',
    cellClassName: 'w-[20px] !pl-0 !pr-0',
    heading: ({ context: { isViewingBuckets, multiSelect } }) => {
      if (isViewingBuckets) {
        return null
      }
      return (
        <ControlGroup className="flex h-4">
          <Checkbox
            onClick={multiSelect.onSelectPage}
            checked={multiSelect.isPageAllSelected}
          />
        </ControlGroup>
      )
    },
    render: function TypeColumn({
      data: { isUploading, type, name, path, size },
    }) {
      const { setActiveDirectory } = useFilesManager()
      if (isUploading) {
        return (
          <Button size="none" variant="ghost" state="waiting">
            <Document16 />
          </Button>
        )
      }
      if (name === '..') {
        return (
          <Button
            size="none"
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
            underline="hover"
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
              underline="hover"
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
            underline="hover"
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
    render: function SizeColumn({ data: { type, name, size } }) {
      if (type === 'bucket') {
        return null
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
      const { type, isUploading, loaded, size } = data
      if (type === 'bucket') {
        return null
      }
      if (isUploading) {
        const displayPercent = loaded
          ? ((loaded / size) * 100).toFixed(0) + '%'
          : '0%'
        return (
          <Tooltip
            content={`Uploaded ${humanBytes(loaded || 0)}/${humanBytes(size)}`}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <Text color="subtle">
                <Upload16 className="scale-75" />
              </Text>
              <Text color="subtle" size="12">
                {displayPercent}
              </Text>
            </div>
          </Tooltip>
        )
      }
      return <FilesHealthColumn {...data} />
    },
  },
]
