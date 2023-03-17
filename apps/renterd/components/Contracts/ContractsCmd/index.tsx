import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../CmdRoot/Item'
import { ContractsFilterCmd } from './ContractsFilterCmd'
import { Page } from '../../CmdRoot/types'
import { useRouter } from 'next/router'
import { useDialog } from '../../../contexts/dialog'
import { routes } from '../../../config/routes'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

export function ContractsCmd({
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  currentPage: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  const router = useRouter()
  const { closeDialog } = useDialog()
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={parentPage}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        {commandPage.label}
      </CommandItemNav>
      <CommandGroup currentPage={currentPage} commandPage={commandPage}>
        <CommandItemSearch
          currentPage={currentPage}
          commandPage={commandPage}
          onSelect={() => {
            router.push(routes.contracts.index)
            closeDialog()
          }}
        >
          View contracts
        </CommandItemSearch>
      </CommandGroup>
      <ContractsFilterCmd
        parentPage={commandPage}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
        pushPage={pushPage}
      />
    </>
  )
}
