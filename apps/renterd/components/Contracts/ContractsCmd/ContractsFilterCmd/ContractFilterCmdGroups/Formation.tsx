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

export const contractFilterFormationPage = {
  namespace: 'contracts/filterFormationDate',
  label: 'Contracts filter by formation date',
}

const options = [
  {
    id: 'formationDate',
    value: 'day',
    label: 'formed in the last day',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const formationDate = now - getDaysInMs(1)
      return d.startTime >= formationDate
    },
  },
  {
    id: 'formationDate',
    value: 'week',
    label: 'formed in the last week',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const formationDate = now - getWeeksInMs(1)
      return d.startTime >= formationDate
    },
  },
  {
    id: 'formationDate',
    value: 'twoWeeks',
    label: 'formed in the last two weeks',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const formationDate = now - getWeeksInMs(2)
      return d.startTime >= formationDate
    },
  },
  {
    id: 'formationDate',
    value: 'month',
    label: 'formed in the last month',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const formationDate = now - getMonthsInMs(1)
      return d.startTime >= formationDate
    },
  },
  {
    id: 'formationDate',
    value: 'twoMonths',
    label: 'formed in the last two months',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const formationDate = now - getMonthsInMs(2)
      return d.startTime >= formationDate
    },
  },
  {
    id: 'formationDate',
    value: 'year',
    label: 'formed in the last year',
    fn: (d: ContractData) => {
      const now = new Date().getTime()
      const formationDate = now - getYearsInMs(1)
      return d.startTime >= formationDate
    },
  },
]

export function FormationCmdGroup({
  currentPage,
  select,
}: {
  currentPage: Page
  select: (filter: ClientFilterItem<ContractData>) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractFilterFormationPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractFilterFormationPage}
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
