import { cx } from 'class-variance-authority'
import {
  textFieldStyles,
  panelStyles,
  Label,
  Separator,
  Button,
} from '@siafoundation/design-system'
import { Command } from 'cmdk'
import { WalletCmdGroup } from './WalletCmdGroup'
import { AppCmdGroup } from './AppCmdGroup'
import { useCallback, useState } from 'react'
import { NodeCmdGroup } from './NodeCmdGroup'
import { ConfigCmdGroup } from './ConfigCmdGroup'
import { Page } from './types'
import { useDebounce } from 'use-debounce'
import { CmdEmptyDefault } from './CmdEmpty'

type Props = {
  panel?: boolean
}

export function CmdRoot({ panel }: Props) {
  // const { closeDialog } = useDialog()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [pages, setPages] = useState<Page[]>([])
  const page: Page | undefined = pages[pages.length - 1]
  const rootPage = pages.length === 0

  const pushPage = useCallback(
    (page: Page) => {
      setPages((pages) => [...pages, page])
    },
    [setPages],
  )

  // const beforeSelect = useCallback(() => {
  //   closeDialog()
  // }, [closeDialog])

  // const afterSelect = useCallback(() => {
  //   setSearch('')
  // }, [setSearch])

  const Empty = page?.empty || CmdEmptyDefault

  return (
    <Command
      label="Command Menu"
      loop
      className={cx(panel && panelStyles())}
      onKeyDown={(e) => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (
          (pages.length > 0 && e.key === 'Escape') ||
          (e.key === 'Backspace' && !search)
        ) {
          e.preventDefault()
          setPages((pages) => pages.slice(0, -1))
        }
      }}
    >
      {!!page && (
        <Label className="px-2 flex justify-between items-center">
          {page.label}
          {page.tag ? (
            <Button
              variant="inactive"
              state="waiting"
              tabIndex={-1}
              size="small"
            >
              {page.tag}
            </Button>
          ) : null}
        </Label>
      )}
      <Command.Input
        aria-label="search commands"
        name="cmdk-input"
        value={search}
        onValueChange={setSearch}
        className={textFieldStyles({ variant: 'ghost', focus: 'none' })}
        placeholder={
          page?.prompt ||
          (rootPage
            ? 'Search for commands, eg: theme, redundancy'
            : `Search commands`)
        }
      />
      <Separator className="my-2" />
      <Command.List>
        <Command.Empty>
          <Empty search={search} debouncedSearch={debouncedSearch} />
        </Command.Empty>
        <AppCmdGroup currentPage={page} pushPage={pushPage} />
        <WalletCmdGroup currentPage={page} pushPage={pushPage} />
        <ConfigCmdGroup currentPage={page} pushPage={pushPage} />
        <NodeCmdGroup currentPage={page} pushPage={pushPage} />
      </Command.List>
    </Command>
  )
}
