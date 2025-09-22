import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../CmdRoot/Item'
import { HostsFilterCmd } from './HostsFilterCmd'
import { Page } from '../../../CmdRoot/types'
import { useRouter } from 'next/navigation'
import { useDialog } from '../../../../contexts/dialog'
import { routes } from '../../../../config/routes'

export const commandPage = {
  namespace: 'hosts',
  label: 'Hosts',
}

export function HostsCmd({
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
            router.push(routes.hosts.index)
            closeDialog()
          }}
        >
          View hosts
        </CommandItemSearch>
      </CommandGroup>
      <HostsFilterCmd
        parentPage={commandPage}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
        pushPage={pushPage}
      />
    </>
  )
}
