import {
  Text,
  ValueNum,
  Table,
  TableColumn,
  LoadingDots,
  Dropzone,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import { ObjectDropdownMenu } from './ObjectDropdownMenu'
import BigNumber from 'bignumber.js'
import { useObject, useObjectDirectory } from '@siafoundation/react-core'
import { useUploads } from '../../contexts/uploads'
import { useMemo } from 'react'
import { sortBy, toPairs } from 'lodash'
import { EmptyState } from './EmptyState'

type ColumnIds = 'name' | 'size' | 'slabs' | 'actions'

type Data = {
  id: string
  path: string
  isUploading?: boolean
}

export function FilesExplorer() {
  const { onDrop, uploadsList } = useUploads()
  const objects = useObjectDirectory({
    params: {
      key: encodeURIComponent('/'),
    },
  })

  const data: Data[] = useMemo(() => {
    const dataMap: Record<string, Data> = {}

    objects.data?.entries?.forEach((o) => {
      dataMap[o] = {
        id: o,
        path: o,
      }
    })
    uploadsList.forEach(({ path }) => {
      dataMap[path] = {
        id: path,
        path: `//${path}`,
        isUploading: true,
      }
    })
    const all = sortBy(
      toPairs(dataMap).map((p) => p[1]),
      'path'
    )
    return all
  }, [objects, uploadsList])

  const columns: TableColumn<ColumnIds, Data>[] = [
    {
      id: 'name',
      label: 'Name',
      size: 5,
      render: ({ path }) => (
        <Text ellipsis weight="semibold">
          {path}
        </Text>
      ),
    },
    {
      id: 'size',
      label: 'Size',
      size: 2,
      render: function SizeColumn({ path }: Data) {
        const obj = useObject({
          params: {
            key: encodeURIComponent(path.slice(1)),
          },
          config: {
            swr: {
              dedupingInterval: 5000,
            },
          },
        })
        if (obj.error) {
          return <LoadingDots />
        }
        return (
          <ValueNum
            size="12"
            value={(obj.data?.object.Slabs || []).reduce(
              (acc, s) => acc.plus(s.Length - s.Offset),
              new BigNumber(0)
            )}
            variant="value"
            color="subtle"
            format={(v) => humanBytes(v.toNumber())}
          />
        )
      },
    },
    {
      id: 'slabs',
      label: 'Slabs',
      size: 2,
      render: function SlabsColumn({ path }: Data) {
        const obj = useObject({
          params: {
            key: encodeURIComponent(path.slice(1)),
          },
          config: {
            swr: {
              dedupingInterval: 5000,
            },
          },
        })
        if (obj.error) {
          return <LoadingDots />
        }
        return (
          <ValueNum
            size="12"
            value={new BigNumber(obj.data?.object.Slabs.length || 0)}
            variant="value"
            format={(v) => humanNumber(v)}
          />
        )
      },
    },
    {
      id: 'actions',
      label: '',
      size: 0.5,
      className: 'justify-end',
      render: ({ path, isUploading }) =>
        !isUploading && <ObjectDropdownMenu path={path} />,
    },
  ]

  return (
    <div className="relative">
      <Dropzone onDrop={onDrop} noClick={data.length > 0}>
        <Table
          isLoading={objects.isValidating}
          pageSize={10}
          data={data}
          columns={columns}
          rowSize="dense"
          emptyState={<EmptyState />}
        />
      </Dropzone>
    </div>
  )
}
