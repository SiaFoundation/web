import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import { CommandGroup, CommandItemNav, CommandItemSearch } from './Item'
import { Page } from './types'

const commandPage = {
  namespace: 'autopilot',
  label: 'Autopilot',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function AutopilotCmdGroup({
  parentPage,
  currentPage,
  pushPage,
}: Props) {
  const router = useRouter()
  const { closeDialog } = useDialog()
  return (
    <CommandGroup currentPage={currentPage} commandPage={commandPage}>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        Autopilot
      </CommandItemNav>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.autopilot.index)
          closeDialog()
        }}
      >
        Open autopilot
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.autopilot.estimates)
          closeDialog()
        }}
      >
        Configure estimates
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.autopilot.settings)
          closeDialog()
        }}
      >
        Configure settings
      </CommandItemSearch>
    </CommandGroup>
  )
}
