import {
  Button,
  Add16,
  Filter16,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  ComboPool,
  getWeeksInMs,
  getDaysInMs,
  getMonthsInMs,
  getYearsInMs,
} from '@siafoundation/design-system'
import { ContractData } from '../../contexts/contracts/types'
import { useContracts } from '../../contexts/contracts'
import { pick } from 'lodash'

const options = [
  {
    id: 'expiry',
    value: 'day',
    label: 'Expires today',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getDaysInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'week',
    label: 'Expires this week',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getWeeksInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'month',
    label: 'Expires this month',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getMonthsInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'nextMonth',
    label: 'Expires next month',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getMonthsInMs(2)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'year',
    label: 'Expires this year',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getYearsInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'expired',
    label: 'Expired',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      return d.endTime < now
    },
  },
]

export function ContractsFilterDropdownMenu() {
  const { setFilter, filters } = useContracts()

  const expirySelection = filters['expiry'] ? [filters['expiry'].value] : []

  return (
    <DropdownMenu
      trigger={
        <Button size="small">
          <Filter16 />
          Filter
          <Add16 />
        </Button>
      }
      contentProps={{
        align: 'start',
        className: 'max-w-[300px]',
      }}
    >
      <DropdownMenuGroup className="py-1">
        <DropdownMenuLabel>Expiration date</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="py-1">
            <ComboPool
              options={options.map((o) => pick(o, ['label', 'value']))}
              values={expirySelection}
              onChange={(value) => {
                const o = options.find((o) => o.value === value)
                setFilter(o.id, o)
              }}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
