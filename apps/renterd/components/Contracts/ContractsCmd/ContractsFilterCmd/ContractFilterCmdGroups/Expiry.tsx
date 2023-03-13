import {
  getDaysInMs,
  getWeeksInMs,
  getMonthsInMs,
  getYearsInMs,
  ClientFilterItem,
} from '@siafoundation/design-system'
import { ContractData } from '../../../../../contexts/contracts/types'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'

export const contractFilterExpiryPage = {
  namespace: 'contracts/filterExpiryDate',
  label: 'Contracts filter by expiry date',
}

const options = [
  {
    id: 'expiry',
    value: 'day',
    label: 'expires today',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getDaysInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'week',
    label: 'expires this week',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getWeeksInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'month',
    label: 'expires this month',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getMonthsInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'nextMonth',
    label: 'expires next month',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getMonthsInMs(2)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'year',
    label: 'expires this year',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const expiry = now + getYearsInMs(1)
      return d.endTime < expiry && d.endTime > now
    },
  },
  {
    id: 'expiry',
    value: 'expired',
    label: 'expired',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      return d.endTime < now
    },
  },
]

export function ExpiryCmdGroup({
  currentPage,
  select,
}: {
  currentPage: Page
  select: (filter: ClientFilterItem<ContractData>) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractFilterExpiryPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractFilterExpiryPage}
          onSelect={() => {
            select(o)
          }}
        >
          {o.label}
        </CommandItemSearch>
      ))}
    </CommandGroup>
  )
}
