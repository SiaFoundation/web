import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import { CommandGroup, CommandItemNav, CommandItemSearch } from './Item'
import { Page } from './types'

const commandPage = {
  namespace: 'node',
  label: 'Blockchain node',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function NodeCmdGroup({ currentPage, parentPage, pushPage }: Props) {
  const { openDialog, closeDialog } = useDialog()
  const router = useRouter()
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
        Blockchain node
      </CommandItemNav>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('connectPeer')
        }}
      >
        Connect to a peer
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.node.index)
          closeDialog()
        }}
      >
        View peers
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.node.index)
          closeDialog()
        }}
      >
        View transaction pool
      </CommandItemSearch>
    </CommandGroup>
  )
}
