import { Label } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import {
  CommandGroup,
  CommandItemRootSearchAndPage,
  CommandItemRootInitialOnly,
} from './Item'

const commandPage = 'Autopilot'

type Props = {
  page: string
  pushPage: (page: string) => void
}

export function CommandKAutopilot({ page, pushPage }: Props) {
  const router = useRouter()
  const { closeDialog } = useDialog()
  return (
    <CommandGroup
      currentPage={page}
      commandPage={commandPage}
      heading={<Label>Autopilot</Label>}
    >
      <CommandItemRootInitialOnly
        currentPage={page}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        Autopilot
      </CommandItemRootInitialOnly>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.autopilot.index)
          closeDialog()
        }}
      >
        Open autopilot
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.autopilot.estimates)
          closeDialog()
        }}
      >
        Configure estimates
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.autopilot.settings)
          closeDialog()
        }}
      >
        Configure settings
      </CommandItemRootSearchAndPage>
    </CommandGroup>
  )
}
