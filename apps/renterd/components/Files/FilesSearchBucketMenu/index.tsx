import { cx } from 'class-variance-authority'
import {
  textFieldStyles,
  panelStyles,
  Label,
  Separator,
  Button,
} from '@siafoundation/design-system'
import { Command } from 'cmdk'
import { useCallback, useState } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useRouter, usePathname } from 'next/navigation'
import { routes } from '../../../config/routes'
import {
  getFilesSearchBucketPage,
  FilesSearchCmd,
} from '../../Files/FilesCmd/FilesSearchCmd'
import { useDebounce } from 'use-debounce'
import { FileSearchEmpty } from '../../Files/FilesCmd/FilesSearchCmd/FileSearchEmpty'
import { useFilesManager } from '../../../contexts/filesManager'

type Props = {
  panel?: boolean
}

export function FilesSearchBucketMenu({ panel }: Props) {
  const { closeDialog } = useDialog()
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const { activeBucket } = useFilesManager()

  const beforeSelect = useCallback(() => {
    closeDialog()
  }, [closeDialog])

  const page = getFilesSearchBucketPage(activeBucket?.name)

  return (
    <Command
      label={page.label}
      shouldFilter={false}
      className={cx(panel && panelStyles())}
    >
      <Label className="px-2 flex justify-between items-center">
        File search in current bucket
        {!!activeBucket && (
          <Button variant="inactive" state="waiting" tabIndex={-1} size="small">
            {activeBucket.name}
          </Button>
        )}
      </Label>
      <Command.Input
        aria-label="search files"
        name="search-files-menu-input"
        value={search}
        onValueChange={setSearch}
        className={textFieldStyles({ variant: 'ghost', focus: 'none' })}
        placeholder={page.prompt}
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
            mode="bucket"
            debouncedSearch={debouncedSearch}
            search={search}
            currentPage={page}
            beforeSelect={() => {
              beforeSelect()
            }}
            afterSelect={() => {
              if (!pathname.startsWith(routes.buckets.index)) {
                router.push(routes.buckets.index)
              }
            }}
          />
        </Command.List>
      </div>
    </Command>
  )
}
