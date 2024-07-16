import { useRouter } from 'next/router'
import { routes } from '../../../config/routes'
import { useDialog } from '../../../contexts/dialog'
import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../CmdRoot/Item'
import type { Page } from '../../CmdRoot/types'
import { FilesSearchCmd, filesSearchPage } from './FilesSearchCmd'

export const commandPage = {
  namespace: 'files',
  label: 'Files',
}

export function FilesCmd({
  search,
  debouncedSearch,
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  search: string
  debouncedSearch: string
  currentPage?: Page
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
            if (!router.pathname.startsWith(routes.buckets.index)) {
              router.push(routes.buckets.index)
            }
            closeDialog()
            afterSelect?.()
          }}
        >
          View files
        </CommandItemSearch>
        <CommandItemSearch
          currentPage={currentPage}
          commandPage={commandPage}
          onSelect={() => {
            pushPage(filesSearchPage)
            afterSelect?.()
          }}
        >
          Search files
        </CommandItemSearch>
      </CommandGroup>
      <FilesSearchCmd
        debouncedSearch={debouncedSearch}
        search={search}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
      />
    </>
  )
}
