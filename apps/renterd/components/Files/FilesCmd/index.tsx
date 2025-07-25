import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../CmdRoot/Item'
import {
  FilesSearchCmd,
  filesSearchAllPage,
  getFilesSearchBucketPage,
} from './FilesSearchCmd'
import { Page } from '../../CmdRoot/types'
import { usePathname, useRouter } from 'next/navigation'
import { useDialog } from '../../../contexts/dialog'
import { routes } from '../../../config/routes'
import { useFilesManager } from '../../../contexts/filesManager'

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
  currentPage: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { closeDialog } = useDialog()
  const { activeBucket } = useFilesManager()
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
            if (!pathname.startsWith(routes.buckets.index)) {
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
            pushPage(filesSearchAllPage)
            afterSelect?.()
          }}
        >
          Search all files
        </CommandItemSearch>
        {activeBucket ? (
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              pushPage(getFilesSearchBucketPage(activeBucket.name))
              afterSelect?.()
            }}
          >
            Search files in bucket
          </CommandItemSearch>
        ) : null}
      </CommandGroup>
      <FilesSearchCmd
        mode="global"
        debouncedSearch={debouncedSearch}
        search={search}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
      />
      <FilesSearchCmd
        mode="bucket"
        debouncedSearch={debouncedSearch}
        search={search}
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
      />
    </>
  )
}
