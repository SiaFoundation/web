import { Label } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import {
  CommandGroup,
  CommandItemRootInitialOnly,
  CommandItemRootSearchAndPage,
} from './Item'

const commandPage = 'Blockchain node'

type Props = {
  page: string
  pushPage: (page: string) => void
}

export function CommandKNode({ page, pushPage }: Props) {
  const { openDialog, closeDialog } = useDialog()
  const router = useRouter()
  return (
    <CommandGroup
      currentPage={page}
      commandPage={commandPage}
      heading={<Label>Blockchain node</Label>}
    >
      <CommandItemRootInitialOnly
        currentPage={page}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        Blockchain node
      </CommandItemRootInitialOnly>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('connectPeer')
        }}
      >
        Connect to a peer
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.node.index)
          closeDialog()
        }}
      >
        View peers
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.node.index)
          closeDialog()
        }}
      >
        View transaction pool
      </CommandItemRootSearchAndPage>
    </CommandGroup>
  )
}
