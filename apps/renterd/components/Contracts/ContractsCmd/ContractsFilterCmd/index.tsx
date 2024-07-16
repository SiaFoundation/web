import type { ClientFilterItem } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useContracts } from '../../../../contexts/contracts'
import type { ContractData } from '../../../../contexts/contracts/types'
import type { Page } from '../../../CmdRoot/types'
import { ContractFilterCmdGroups } from './ContractFilterCmdGroups'
import { ContractFilterNav } from './ContractFilterNav'

export function ContractsFilterCmd({
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  currentPage?: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  const { setFilter } = useContracts()

  const select = useCallback(
    (filter?: ClientFilterItem<ContractData>) => {
      if (beforeSelect) {
        beforeSelect()
      }
      if (filter) {
        setFilter(filter)
      }
      if (afterSelect) {
        afterSelect()
      }
    },
    [setFilter, beforeSelect, afterSelect],
  )

  return (
    <>
      <ContractFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
        select={select}
      />
      <ContractFilterCmdGroups currentPage={currentPage} select={select} />
    </>
  )
}
