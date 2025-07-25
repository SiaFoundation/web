import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../CmdRoot/Item'
import { Page } from '../../CmdRoot/types'
import { useRouter } from 'next/navigation'
import { useDialog } from '../../../contexts/dialog'
import { routes } from '../../../config/routes'

export const commandPage = {
  namespace: 'alerts',
  label: 'Alerts',
}

export function AlertsCmd({
  currentPage,
  parentPage,
  pushPage,
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
            router.push(routes.alerts.index)
            closeDialog()
          }}
        >
          View alerts
        </CommandItemSearch>
      </CommandGroup>
    </>
  )
}
