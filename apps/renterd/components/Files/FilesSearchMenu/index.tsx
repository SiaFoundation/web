import { cx } from 'class-variance-authority'
import {
  textFieldStyles,
  panelStyles,
  Label,
  Separator,
} from '@siafoundation/design-system'
import { Command } from 'cmdk'
import { useCallback, useState } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useRouter } from 'next/router'
import { routes } from '../../../config/routes'
import { useContracts } from '../../../contexts/contracts'
import { FilesSearchCmd, filesSearchPage } from '../FilesCmd/FilesSearchCmd'
import { useDebounce } from 'use-debounce'
import { FileSearchEmpty } from '../FilesCmd/FilesSearchCmd/FileSearchEmpty'

type Props = {
  panel?: boolean
}

export function FilesSearchMenu({ panel }: Props) {
  const { resetFilters } = useContracts()
  const { closeDialog } = useDialog()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)

  const beforeSelect = useCallback(() => {
    closeDialog()
  }, [closeDialog])

  return (
    <Command
      label="Files search"
      shouldFilter={false}
      className={cx(panel && panelStyles())}
    >
      <Label className="px-2">File search</Label>
      <Command.Input
        value={search}
        onValueChange={setSearch}
        className={textFieldStyles({ variant: 'ghost', focus: 'none' })}
        placeholder={filesSearchPage.prompt}
      />
      <Separator className="my-2" />
      <div className="overflow-hidden">
        <Command.List>
          <Command.Empty>
            <FileSearchEmpty
              search={search}
              debouncedSearch={debouncedSearch}
            />
          </Command.Empty>
          <FilesSearchCmd
            debouncedSearch={debouncedSearch}
            search={search}
            currentPage={filesSearchPage}
            beforeSelect={() => {
              beforeSelect()
              resetFilters()
            }}
            afterSelect={() => {
              if (!router.pathname.startsWith(routes.files.index)) {
                router.push(routes.files.index)
              }
            }}
          />
        </Command.List>
      </div>
    </Command>
  )
}
