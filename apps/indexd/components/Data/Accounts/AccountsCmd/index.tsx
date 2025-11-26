import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../CmdRoot/Item'
import { AccountsFilterCmd } from './AccountsFilterCmd'
import { Page } from '../../../CmdRoot/types'
import { useRouter } from 'next/navigation'
import { useDialog } from '../../../../contexts/dialog'
import { routes } from '../../../../config/routes'

export const commandPage = {
  namespace: 'accounts',
  label: 'Accounts',
}

export function AccountsCmd({
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
            router.push(routes.accounts.index)
            closeDialog()
          }}
        >
          View accounts
        </CommandItemSearch>
      </CommandGroup>
      <AccountsFilterCmd
        parentPage={commandPage}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
        pushPage={pushPage}
      />
    </>
  )
}
