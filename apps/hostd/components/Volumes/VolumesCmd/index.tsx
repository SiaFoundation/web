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
  namespace: 'volumes',
  label: 'Volumes',
}

export function VolumesCmd({
  currentPage,
  parentPage,
  pushPage,
}: {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}) {
  const router = useRouter()
  const { openDialog, closeDialog } = useDialog()
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
            router.push(routes.volumes.index)
            closeDialog()
          }}
        >
          View volumes
        </CommandItemSearch>
        <CommandItemSearch
          currentPage={currentPage}
          commandPage={commandPage}
          onSelect={() => {
            openDialog('volumeCreate')
          }}
        >
          Create volume
        </CommandItemSearch>
      </CommandGroup>
    </>
  )
}
