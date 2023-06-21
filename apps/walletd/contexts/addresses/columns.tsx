import {
  Text,
  TableColumn,
  ValueCopyable,
  Tooltip,
} from '@siafoundation/design-system'
import { AddressData, TableColumnId } from './types'

type AddressesTableColumn = TableColumn<TableColumnId, AddressData, never> & {
  fixed?: boolean
  category?: string
}

export const columns: AddressesTableColumn[] = [
  // {
  //   id: 'actions',
  //   label: '',
  //   fixed: true,
  //   cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
  //   render: ({ data: { name } }) => null,
  // },
  {
    id: 'address',
    label: 'address',
    category: 'general',
    fixed: true,
    render: ({ data: { address, description } }) => {
      return (
        <div className="flex flex-col gap-2">
          <ValueCopyable maxLength={40} value={address} type="address" />
          <Tooltip
            content={
              <pre>
                <Text color="subtle">{description}</Text>
              </pre>
            }
          >
            <Text color="subtle">{description.split('\n')[0]}</Text>
          </Tooltip>
        </div>
      )
    },
  },
  {
    id: 'index',
    label: 'index',
    category: 'general',
    render: ({ data: { index } }) => {
      return (
        <div className="flex flex-col gap-2">
          <Text>{index.toLocaleString()}</Text>
        </div>
      )
    },
  },
]
