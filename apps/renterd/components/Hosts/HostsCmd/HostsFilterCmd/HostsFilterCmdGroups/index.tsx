import { useCallback } from 'react'
import { AddressCmdGroup } from './Address'
import { FilterItem } from '../../../../../hooks/useServerFilters'
import { Page } from '../../../../CmdRoot/types'
import { useHosts } from '../../../../../contexts/hosts'
import { AllowBlockCmdGroup } from './AllowBlock'

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
  const { setFilter } = useHosts()

  const selectCommand = useCallback(
    (filter?: FilterItem) => {
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
    [setFilter, beforeSelect, afterSelect]
  )

  return (
    <>
      <AddressCmdGroup currentPage={currentPage} select={selectCommand} />
      <AllowBlockCmdGroup currentPage={currentPage} select={selectCommand} />
    </>
  )
}
