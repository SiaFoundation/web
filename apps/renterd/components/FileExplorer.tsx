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
      key: 'archive.zip',
      path: 'archive.zip',
      size: 913_280_000,
      health: 1,
    },
    {
      key: 'movie-2021-02-03.mp4',
      path: 'movie-2021-02-03.mp4',
      size: 313_280_000,
      health: 1,
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
          color="$gray9"
          format={(v) => humanBytes(v.toNumber())}
        />
      ),
    },
    {
      key: 'health',
      label: 'Health',
      size: 2,
      render: ({ health }) => (
        <Badge variant={health < 0.97 ? 'crimson' : 'green'}>
          {(health * 100).toFixed(0)}%
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      size: 0.5,
      props: {
        justify: 'end',
      },
      render: ({ path }) => <ObjectDropdownMenu id={path} />,
    },
  ]

  return <Table data={data} columns={columns} rowSize="dense" />
}
