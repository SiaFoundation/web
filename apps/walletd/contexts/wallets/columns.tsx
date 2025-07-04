import {
  Text,
  TableColumn,
  Badge,
  Paragraph,
  Tooltip,
  Button,
  ValueSf,
  ValueScFiat,
} from '@siafoundation/design-system'
import { Locked16, Unlocked16, CaretDown16 } from '@siafoundation/react-icons'
import { humanDate } from '@siafoundation/units'
import { humanTimeAndUnits } from '../../lib/time'
import { walletTypes } from '../../config/walletTypes'
import { WalletData, TableColumnId } from './types'
import { useWalletBalance } from '@siafoundation/walletd-react'
import BigNumber from 'bignumber.js'
import { WalletContextMenu } from '../../components/WalletContextMenu'

type WalletsTableColumn = TableColumn<
  TableColumnId,
  WalletData,
  { walletAutoLockTimeout: number; walletAutoLockEnabled: boolean }
> & {
  fixed?: boolean
  category?: string
}

export const columns: WalletsTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
    render: ({ data }) => (
      <WalletContextMenu
        trigger={
          <Button variant="ghost" icon="hover">
            <CaretDown16 />
          </Button>
        }
        contentProps={{ align: 'start' }}
        wallet={data}
      />
    ),
  },
  {
    id: 'name',
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
    id: 'balance',
    label: 'balance',
    category: 'general',
    contentClassName: 'justify-end',
    render: function RenderBalance({ data: { id } }) {
      const balance = useWalletBalance({
        params: {
          id,
        },
      })
      if (!balance.data) {
        return null
      }
      return (
        <div className="flex flex-col gap-2 items-end">
          <ValueScFiat
            displayBoth
            size="12"
            variant="value"
            value={new BigNumber(balance.data.siacoins)}
          />
          {!!balance.data.siafunds && (
            <ValueSf size="12" variant="value" value={balance.data.siafunds} />
          )}
        </div>
      )
    },
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
    render: ({
      data: {
        metadata: { type },
      },
    }) => {
      return (
        <Tooltip content={walletTypes[type]?.tip}>
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
    id: 'status',
    label: 'status',
    category: 'general',
    render: ({
      data,
      context: { walletAutoLockEnabled, walletAutoLockTimeout },
    }) => {
      const { type } = data.metadata
      const { status, activityAt } = data.state
      const { unlock, lock } = data.actions
      if (type === 'seed') {
        const sinceActivityMs = new Date().getTime() - activityAt
        const remainingMs = Math.max(walletAutoLockTimeout - sinceActivityMs, 0)

        const remaining = humanTimeAndUnits(remainingMs)

        const tipUnlocked = walletAutoLockEnabled
          ? `The wallet is currently unlocked. The wallet will stay unlocked until it is inactive for ${remaining.amount.toFixed(
              0
            )} more ${remaining.units}, manually locked, or the app is closed.`
          : `The wallet is currently unlocked. The wallet will stay unlocked until it is manually locked or the app is closed.`
        const tip =
          status === 'unlocked'
            ? tipUnlocked
            : 'The wallet is currently locked.'
        return (
          <Button
            tip={tip}
            color={status === 'unlocked' ? 'contrast' : 'verySubtle'}
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              if (status === 'unlocked') {
                lock()
              } else {
                unlock()
              }
            }}
          >
            {status === 'unlocked' ? <Unlocked16 /> : <Locked16 />}
          </Button>
        )
      }

      return null
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
