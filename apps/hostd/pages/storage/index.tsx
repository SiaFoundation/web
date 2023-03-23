import {
  Badge,
  Button,
  Add20,
  DatumCard,
  ProgressBar,
  Text,
  Table,
  TableColumn,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { StorageFolderDropdownMenu } from '../../components/StorageFolderDropdownMenu'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'

type Columns = 'path' | 'storage' | 'status' | 'errors' | 'actions'

type Data = {
  id: string
  path: string
  storageUsed: number
  storageCapacity: number
  status: string
  writeErrors: number
  readErrors: number
}

export default function StoragePage() {
  const { openDialog } = useDialog()

  const data: Data[] = [
    {
      id: '/Users/alex/data/sia/drive1',
      path: '/Users/alex/data/sia/drive1',
      storageUsed: 5_000_000_000,
      storageCapacity: 14_650_000_000,
      status: 'resizing',
      writeErrors: 5,
      readErrors: 34,
    },
    {
      id: '/Users/alex/fast',
      path: '/Users/alex/fast',
      storageUsed: 400_000_000,
      storageCapacity: 913_280_000,
      status: 'removing',
      writeErrors: 15,
      readErrors: 82,
    },
    {
      id: '/Users/alex/nvme',
      path: '/Users/alex/nvme',
      storageUsed: 309_000_000,
      storageCapacity: 313_280_000,
      status: 'ready',
      writeErrors: 0,
      readErrors: 0,
    },
  ]

  const columns: TableColumn<Columns, Data>[] = [
    {
      id: 'path',
      label: 'Path',
      render: ({ path }) => (
        <Text font="mono" ellipsis>
          {path}
        </Text>
      ),
    },
    {
      id: 'storage',
      label: 'Storage',
      render: ({ storageUsed, storageCapacity }) => (
        <div className="flex gap-1 w-full max-w-[200px] pt-[10px]">
          <ProgressBar
            variant="accent"
            value={storageUsed}
            max={storageCapacity}
            label={`${humanBytes(storageUsed)} / ${humanBytes(
              storageCapacity
            )}`}
          />
        </div>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: ({ status }) => <Badge variant="green">{status}</Badge>,
    },
    {
      id: 'errors',
      label: 'Errors',
      tip: 'Read | write',
      render: ({ readErrors, writeErrors }) => (
        <Text font="mono">
          {readErrors}|{writeErrors}
        </Text>
      ),
    },
    {
      id: 'actions',
      label: '',
      contentClassName: 'justify-end',
      render: ({ path }) => <StorageFolderDropdownMenu id={path} />,
    },
  ]

  const total = data.reduce((acc, i) => acc + i.storageCapacity, 0)
  const used = data.reduce((acc, i) => acc + i.storageUsed, 0)
  const free = total - used

  return (
    <HostdAuthedLayout
      title="Storage"
      actions={
        <>
          <Button onClick={() => openDialog('storageFolderAdd')}>
            <Add20 />
            Add folder
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <DatumCard label="Free storage" value={humanBytes(free)} />
        <DatumCard label="Total storage" value={humanBytes(total)} />
        <DatumCard label="Read failure rate" value={'4%'} />
        <DatumCard label="Write failure rate" value={'1%'} />
      </div>
      <Table isLoading={false} pageSize={20} data={data} columns={columns} />
    </HostdAuthedLayout>
  )
}
