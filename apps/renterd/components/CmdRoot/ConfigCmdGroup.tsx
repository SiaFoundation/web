import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import { CommandGroup, CommandItemNav, CommandItemSearch } from './Item'
import { Page } from './types'

const commandPage = {
  namespace: 'configuration',
  label: 'Configuration',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function ConfigCmdGroup({ currentPage, parentPage, pushPage }: Props) {
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
        Configuration
      </CommandItemNav>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.index)
          closeDialog()
        }}
      >
        Open configuration
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.gouging)
          closeDialog()
        }}
      >
        Configure gouging
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.redundancy)
          closeDialog()
        }}
      >
        Configure redundancy
      </CommandItemSearch>
    </CommandGroup>
  )
}
