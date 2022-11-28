import {
  Text,
  ValueNum,
  Badge,
  Table,
  TableColumn,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { ObjectDropdownMenu } from './ObjectDropdownMenu'
import BigNumber from 'bignumber.js'

type Data = {
  key: string
  path: string
  size: number
  health: number
}

export function FileExplorer() {
  const data: Data[] = [
    {
      key: 'video-test.mp4',
      path: 'video-test.mp4',
      size: 14_650_000_000,
      health: 0.54,
    },
    {
      key: 'database-snapshot-2021-02-03.zip',
      path: 'database-snapshot-2021-02-03.zip',
      size: 313_280_000,
      health: 1,
    },
    {
      key: 'database-snapshot-2021-02-04.zip',
      path: 'database-snapshot-2021-02-04.zip',
      size: 341_939_000,
      health: 1,
    },
    {
      key: 'database-snapshot-2021-02-05.zip',
      path: 'database-snapshot-2021-02-05.zip',
      size: 374_440_000,
      health: 1,
    },
    {
      key: 'database-snapshot-2021-02-06.zip',
      path: 'database-snapshot-2021-02-06.zip',
      size: 389_311_000,
      health: 1,
    },
    {
      key: 'database-snapshot-2021-02-07.zip',
      path: 'database-snapshot-2021-02-07.zip',
      size: 476_680_000,
      health: 1,
    },
    {
      key: 'database-snapshot-2021-02-08.zip',
      path: 'database-snapshot-2021-02-08.zip',
      size: 499_104_000,
      health: 0.98,
    },
  ]

  const columns: TableColumn<Data>[] = [
    {
      key: 'name',
      label: 'Name',
      size: 5,
      render: ({ path }) => (
        <Text ellipsis weight="semibold">
          {path}
        </Text>
      ),
    },
    {
      key: 'size',
      label: 'Size',
      size: 2,
      render: ({ size }) => (
        <ValueNum
          size="12"
          value={new BigNumber(size)}
          variant="value"
          color="subtle"
          format={(v) => humanBytes(v.toNumber())}
        />
      ),
    },
    {
      key: 'health',
      label: 'Health',
      size: 2,
      render: ({ health }) => (
        <Badge color={health < 0.97 ? 'red' : 'green'}>
          {(health * 100).toFixed(0)}%
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      size: 0.5,
      className: 'justify-end',
      render: ({ path }) => <ObjectDropdownMenu id={path} />,
    },
  ]

  return <Table data={data} columns={columns} rowSize="dense" />
}
