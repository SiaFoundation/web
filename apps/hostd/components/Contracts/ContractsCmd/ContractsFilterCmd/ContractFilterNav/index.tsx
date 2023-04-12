import { Page } from '../../../../CmdRoot/types'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: () => void
}

export function ContractFilterNav({
  currentPage,
  parentPage,
  pushPage,
  select,
}: Props) {
  return null
}
