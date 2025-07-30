import {
  Text,
  TableColumn,
  ProgressBar,
  ValueNum,
  Tooltip,
} from '@siafoundation/design-system'
import {
  Locked16,
  CheckboxCheckedFilled16,
  Edit16,
  WarningSquareFilled16,
  InProgress16,
} from '@siafoundation/react-icons'
import { humanBytes } from '@siafoundation/units'
import { VolumeContextMenu } from '../../components/Volumes/VolumeContextMenu'
import { VolumeData, TableColumnId } from './types'

type Context = Record<string, never>

type VolumesTableColumn = TableColumn<TableColumnId, VolumeData, Context> & {
  fixed?: boolean
  category?: string
}

export const columns: VolumesTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
    render: ({ data }) => <VolumeContextMenu id={data.id} />,
  },
  {
    id: 'id',
    label: 'id',
    category: 'general',
    render: ({ data }) => (
      <Text font="mono" ellipsis>
        {data.id}
      </Text>
    ),
  },
  {
    id: 'path',
    label: 'path',
    category: 'general',
    render: ({ data }) => (
      <Text font="mono" ellipsis>
        {data.localPath}
      </Text>
    ),
  },
  {
    id: 'available',
    label: 'status',
    category: 'general',
    render: ({ data }) => (
      <Tooltip
        side="right"
        content={
          data.available ? (
            'available'
          ) : (
            <>
              <Text size="12">unavailable</Text>
              <div className="flex flex-col">
                {data.errors?.map((reason) => (
                  <Text key={reason} size="10" noWrap>
                    {reason}
                  </Text>
                ))}
              </div>
            </>
          )
        }
      >
        <div className="flex gap-2 items-center">
          {data.available && data.status === 'ready' && (
            <Text color="green">
              <CheckboxCheckedFilled16 />
            </Text>
          )}
          {data.available && data.status !== 'ready' && (
            <Text color="amber">
              <InProgress16 />
            </Text>
          )}
          {!data.available && (
            <Text color="amber">
              <WarningSquareFilled16 />
            </Text>
          )}
          <Text size="12" className="relative -top-px">
            {data.status}
          </Text>
        </div>
      </Tooltip>
    ),
  },
  {
    id: 'readOnly',
    label: 'read/write',
    category: 'general',
    render: ({ data }) =>
      data.readOnly ? (
        <Tooltip content="Read-only">
          <Text>
            <Locked16 />
          </Text>
        </Tooltip>
      ) : (
        <Tooltip content="Read and write enabled">
          <Text color="subtle">
            <Edit16 />
          </Text>
        </Tooltip>
      ),
  },
  {
    id: 'storage',
    label: 'storage',
    category: 'general',
    render: ({ data }) => (
      <div className="flex gap-1 w-full max-w-[200px] pt-[10px]">
        <ProgressBar
          variant="accent"
          value={data.usedBytes}
          max={data.totalBytes}
          label={`${humanBytes(data.usedBytes)} / ${humanBytes(
            data.totalBytes,
          )}`}
        />
      </div>
    ),
  },
  {
    id: 'successfulReads',
    label: 'successful reads',
    category: 'operations',
    render: ({ data }) => (
      <ValueNum
        variant="value"
        size="12"
        value={data.successfulReads}
        format={(v) => v.toNumber().toLocaleString()}
      />
    ),
  },
  {
    id: 'successfulWrites',
    label: 'successful writes',
    category: 'operations',
    render: ({ data }) => (
      <ValueNum
        variant="value"
        size="12"
        value={data.successfulWrites}
        format={(v) => v.toNumber().toLocaleString()}
      />
    ),
  },
  {
    id: 'failedReads',
    label: 'failed reads',
    category: 'operations',
    render: ({ data }) => (
      <ValueNum
        variant="value"
        size="12"
        value={data.failedReads}
        format={(v) => v.toNumber().toLocaleString()}
      />
    ),
  },
  {
    id: 'failedWrites',
    label: 'failed writes',
    category: 'operations',
    render: ({ data }) => (
      <ValueNum
        variant="value"
        size="12"
        value={data.failedWrites}
        format={(v) => v.toNumber().toLocaleString()}
      />
    ),
  },
]
