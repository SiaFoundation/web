import { Button, Text, Tooltip, ValueNum } from '@siafoundation/design-system'
import {
  Document16,
  Earth16,
  Locked16,
  Upload16,
} from '@siafoundation/react-icons'
import { humanBytes } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { BucketContextMenu } from '../../components/Files/BucketContextMenu'
import { FilesHealthColumn } from '../../components/Files/Columns/FilesHealthColumn'
import { DirectoryContextMenu } from '../../components/Files/DirectoryContextMenu'
import { FileContextMenu } from '../../components/Files/FileContextMenu'
import { getKeyFromPath, getParentDirectoryPath } from '../../lib/paths'
import { useFilesManager } from '../filesManager'
import type { FilesTableColumn } from '../filesManager/types'

export const columns: FilesTableColumn[] = [
  {
    id: 'type',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-2 [&+*]:!pl-0',
    render: function TypeColumn({
      data: { isUploading, type, name, path, size },
    }) {
      if (isUploading) {
        return (
          <Button variant="ghost" state="waiting">
            <Document16 />
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
    render: function NameColumn({ data: { path, name, type } }) {
      const { setFileNamePrefixFilter } = useFilesManager()
      const key = getKeyFromPath(path).slice(1)
      if (type === 'bucket') {
        return (
          <Text
            ellipsis
            color="accent"
            weight="semibold"
            className="cursor-pointer"
          >
            {name}
          </Text>
        )
      }
      if (type === 'directory') {
        return (
          <Text
            ellipsis
            color="accent"
            weight="semibold"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setFileNamePrefixFilter(getParentDirectoryPath(key))
            }}
          >
            {key}
          </Text>
        )
      }
      return (
        <Text
          ellipsis
          weight="semibold"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            setFileNamePrefixFilter(getParentDirectoryPath(key))
          }}
        >
          {key}
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
      const { type, isUploading, loaded = 0, size } = data
      if (type === 'bucket') {
        return null
      }
      if (isUploading) {
        const displayPercent = ((loaded / size) * 100).toFixed(0) + '%'
        return (
          <Tooltip
            content={`Uploaded ${humanBytes(loaded)}/${humanBytes(size)}`}
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
