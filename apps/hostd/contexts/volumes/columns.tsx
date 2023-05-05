import {
  Text,
  TableColumn,
  ProgressBar,
  ValueNum,
  Locked16,
  CheckboxCheckedFilled16,
  Tooltip,
  Edit16,
  WarningSquareFilled16,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { VolumeDropdownMenu } from '../../components/Volumes/VolumeDropdownMenu'
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
    render: ({ data }) => <VolumeDropdownMenu id={data.id} />,
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
              <Text>unavailable</Text>
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
          <Text color={data.available ? 'green' : 'amber'}>
            {data.available ? (
              <CheckboxCheckedFilled16 />
            ) : (
              <WarningSquareFilled16 />
            )}
          </Text>
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
            data.totalBytes
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
