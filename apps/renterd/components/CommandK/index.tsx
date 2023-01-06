import { cx } from 'class-variance-authority'
import {
  textFieldStyles,
  panelStyles,
  separatorStyles,
  Label,
} from '@siafoundation/design-system'
import { Command } from 'cmdk'
import { CommandKWallet } from './Wallet'
import { CommandKApp } from './App'
import { useCallback, useState } from 'react'
import { CommandKNode } from './Node'
import { CommandKAutopilot } from './Autopilot'
import { CommandKConfig } from './Config'

type Props = {
  panel?: boolean
}

export function CommandK({ panel }: Props) {
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState([])
  const page = pages[pages.length - 1]
  const rootPage = pages.length === 0

  const pushPage = useCallback(
    (page: string) => {
      setPages((pages) => [...pages, page])
    },
    [setPages]
  )

  return (
    <Command
      label="Command Menu"
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
      {page && <Label>{page}</Label>}
      <Command.Input
        value={search}
        onValueChange={setSearch}
        className={textFieldStyles({ variant: 'ghost', focus: 'none' })}
        placeholder={
          rootPage
            ? 'Search for commands, eg: theme, redundancy'
            : `Search ${page} commands`
        }
      />
      <Command.Separator className={separatorStyles('my-2')} />
      <Command.List>
        <CommandKApp page={page} pushPage={pushPage} />
        {rootPage && !search && (
          <Command.Separator className={separatorStyles('my-2')} />
        )}
        <CommandKAutopilot page={page} pushPage={pushPage} />
        <CommandKWallet page={page} pushPage={pushPage} />
        <CommandKConfig page={page} pushPage={pushPage} />
        <CommandKNode page={page} pushPage={pushPage} />
      </Command.List>
    </Command>
  )
}
