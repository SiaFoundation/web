import { ServerFilterItem } from '@siafoundation/design-system'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { useContracts } from '../../../../../contexts/contracts'

export const contractsFilterStatusPage = {
  namespace: 'contracts/filterStatus',
  label: 'Contracts filter by status',
}

const optionsV1: ServerFilterItem[] = [
  {
    id: 'filterStatusActive',
    value: 'active',
    label: 'Contract is active',
  },
  {
    id: 'filterStatusSuccessful',
    value: 'successful',
    label: 'Contract was successful',
  },
  {
    id: 'filterStatusPending',
    value: 'pending',
    label: 'Contract is pending',
  },
  {
    id: 'filterStatusRejected',
    value: 'rejected',
    label: 'Contract was rejected',
  },
  {
    id: 'filterStatusFailed',
    value: 'failed',
    label: 'Contract has failed',
  },
]

const optionsV2: ServerFilterItem[] = [
  ...optionsV1,
  {
    id: 'filterStatusRenewed',
    value: 'renewed',
    label: 'Contract was renewed',
  },
]

export function StatusCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: ServerFilterItem) => void
}) {
  const { versionMode } = useContracts()
  const options = versionMode === 'v1' ? optionsV1 : optionsV2
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterStatusPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractsFilterStatusPage}
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
