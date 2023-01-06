import { Label } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import {
  CommandGroup,
  CommandItemRootSearchAndPage,
  CommandItemRootInitialOnly,
} from './Item'

const commandPage = 'Configuration'

type Props = {
  page: string
  pushPage: (page: string) => void
}

export function CommandKConfig({ page, pushPage }: Props) {
  const router = useRouter()
  const { closeDialog } = useDialog()
  return (
    <CommandGroup
      currentPage={page}
      commandPage={commandPage}
      heading={<Label>Configuration</Label>}
    >
      <CommandItemRootInitialOnly
        currentPage={page}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        Configuration
      </CommandItemRootInitialOnly>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.index)
          closeDialog()
        }}
      >
        Open configuration
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.gouging)
          closeDialog()
        }}
      >
        Configure gouging
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.redundancy)
          closeDialog()
        }}
      >
        Configure redundancy
      </CommandItemRootSearchAndPage>
    </CommandGroup>
  )
}
