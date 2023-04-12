import { ContractData } from '../../../../../contexts/contracts/types'
import { Page } from '../../../../CmdRoot/types'
import { ClientFilterItem } from '@siafoundation/design-system'

type Props = {
  currentPage: Page
  select?: (filter?: ClientFilterItem<ContractData>) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return null
}
