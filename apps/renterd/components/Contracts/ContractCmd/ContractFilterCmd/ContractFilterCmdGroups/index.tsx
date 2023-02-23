import { useCallback } from 'react'
import { ExpiryCmdGroup } from './Expiry'
import { useContracts } from '../../../../../contexts/contracts'
import { FilterItem } from '../../../../../hooks/useClientFilters'
import { ContractData } from '../../../../../contexts/contracts/types'
import { FormationCmdGroup } from './Formation'
import { RenewCmdGroup } from './Renew'
import { Page } from '../../../../CmdRoot/types'

type Props = {
  currentPage: Page
  pushPage: (page: Page) => void
  beforeSelect?: () => void
  afterSelect?: () => void
}

export function ContractFilterCmdGroups({
  currentPage,
  beforeSelect,
  afterSelect,
}: Props) {
  const { setFilter } = useContracts()

  const selectCommand = useCallback(
    (filter: FilterItem<ContractData>) => {
      if (beforeSelect) {
        beforeSelect()
      }
      setFilter(filter)
      if (afterSelect) {
        afterSelect()
      }
    },
    [setFilter, beforeSelect, afterSelect]
  )

  return (
    <>
      <ExpiryCmdGroup currentPage={currentPage} select={selectCommand} />
      <FormationCmdGroup currentPage={currentPage} select={selectCommand} />
      <RenewCmdGroup currentPage={currentPage} select={selectCommand} />
    </>
  )
}
