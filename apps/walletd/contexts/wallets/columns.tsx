import {
  Text,
  TableColumn,
  Badge,
  Paragraph,
  Tooltip,
} from '@siafoundation/design-system'
import { humanDate } from '@siafoundation/sia-js'
import { walletTypes } from '../../config/walletTypes'
import { WalletData, TableColumnId } from './types'

type WalletsTableColumn = TableColumn<TableColumnId, WalletData, never> & {
  fixed?: boolean
  category?: string
}

export const columns: WalletsTableColumn[] = [
  // {
  //   id: 'actions',
  //   label: '',
  //   fixed: true,
  //   cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
  //   render: ({ data: { name } }) => null,
  // },
  {
    id: 'details',
    label: 'name',
    category: 'general',
    fixed: true,
    render: ({ data: { id, name, description } }) => {
      return (
        <div className="flex flex-col gap-2">
          <Text weight="bold" ellipsis>
            {name || id}
          </Text>
          {description && (
            <Tooltip
              content={
                <pre>
                  <Paragraph size="12" className="w-full whitespace-pre-wrap">
                    {description}
                  </Paragraph>
                </pre>
              }
            >
              <Paragraph size="12">{description.split('\n')[0]}</Paragraph>
            </Tooltip>
          )}
        </div>
      )
    },
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
    render: ({ data: { type } }) => {
      return (
        <Tooltip content={walletTypes[type]?.title}>
          <Badge interactive={false} className="flex gap-0.5 items-center">
            <Text color="subtle" className="scale-75 relative top-px">
              {walletTypes[type]?.icon}
            </Text>
            {type}
          </Badge>
        </Tooltip>
      )
    },
  },
  {
    id: 'createdAt',
    label: 'created on',
    category: 'general',
    render: ({ data: { createdAt } }) => {
      if (!createdAt) {
        return null
      }
      return (
        <Text size="12">{humanDate(createdAt, { dateStyle: 'medium' })}</Text>
      )
    },
  },
]
