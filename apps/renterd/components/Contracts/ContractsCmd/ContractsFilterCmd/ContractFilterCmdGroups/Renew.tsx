import {
  daysInMilliseconds,
  weeksInMilliseconds,
  monthsInMilliseconds,
  yearsInMilliseconds,
  ClientFilterItem,
} from '@siafoundation/design-system'
import { ContractData } from '../../../../../contexts/contracts/types'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'

export const contractFilterRenewPage = {
  namespace: 'contracts/filterRenewDate',
  label: 'Contracts filter by renew date',
}

const options = [
  {
    id: 'renewDate',
    value: 'day',
    label: 'renewed in the last day',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const ago = now - daysInMilliseconds(1)
      return d.isRenewed && d.startTime >= ago
    },
  },
  {
    id: 'renewDate',
    value: 'week',
    label: 'renewed in the last week',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const ago = now - weeksInMilliseconds(1)
      return d.isRenewed && d.startTime >= ago
    },
  },
  {
    id: 'renewDate',
    value: 'twoWeeks',
    label: 'renewed in the last two weeks',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const ago = now - weeksInMilliseconds(2)
      return d.isRenewed && d.startTime >= ago
    },
  },
  {
    id: 'renewDate',
    value: 'month',
    label: 'renewed in the last month',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const ago = now - monthsInMilliseconds(1)
      return d.isRenewed && d.startTime >= ago
    },
  },
  {
    id: 'renewDate',
    value: 'twoMonths',
    label: 'renewed in the last two months',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const ago = now - monthsInMilliseconds(2)
      return d.isRenewed && d.startTime >= ago
    },
  },
  {
    id: 'renewDate',
    value: 'year',
    label: 'renewed in the last year',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const ago = now - yearsInMilliseconds(1)
      return d.isRenewed && d.startTime >= ago
    },
  },
]

export function RenewCmdGroup({
  currentPage,
  select,
}: {
  currentPage: Page
  select: (filter: ClientFilterItem<ContractData>) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractFilterRenewPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractFilterRenewPage}
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
