import { cx } from 'class-variance-authority'
import {
  textFieldStyles,
  panelStyles,
  Label,
  Separator,
} from '@siafoundation/design-system'
import { Command } from 'cmdk'
import { WalletCmdGroup } from './WalletCmdGroup'
import { AppCmdGroup } from './AppCmdGroup'
import { useCallback, useState } from 'react'
import { NodeCmdGroup } from './NodeCmdGroup'
import { AutopilotCmdGroup } from './AutopilotCmdGroup'
import { ConfigCmdGroup } from './ConfigCmdGroup'
import { useDialog } from '../../contexts/dialog'
import { useRouter } from 'next/router'
import { routes } from '../../config/routes'
import { ContractCmd } from '../Contracts/ContractCmd'
import { Page } from './types'
import { useContracts } from '../../contexts/contracts'

type Props = {
  panel?: boolean
}

export function CmdRoot({ panel }: Props) {
  const { resetFilters } = useContracts()
  const { closeDialog } = useDialog()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<Page[]>([])
  const page = pages[pages.length - 1]
  const rootPage = pages.length === 0

  const pushPage = useCallback(
    (page: Page) => {
      setPages((pages) => [...pages, page])
    },
    [setPages]
  )

  const beforeSelect = useCallback(() => {
    closeDialog()
  }, [closeDialog])

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
      {page && <Label className="px-2">{page.label}</Label>}
      <Command.Input
        value={search}
        onValueChange={setSearch}
        className={textFieldStyles({ variant: 'ghost', focus: 'none' })}
        placeholder={
          rootPage
            ? 'Search for commands, eg: theme, redundancy'
            : `Search commands`
        }
      />
      <Separator className="my-2" />
      <Command.List>
        <AppCmdGroup currentPage={page} pushPage={pushPage} />
        <AutopilotCmdGroup currentPage={page} pushPage={pushPage} />
        <WalletCmdGroup currentPage={page} pushPage={pushPage} />
        <ContractCmd
          currentPage={page}
          pushPage={pushPage}
          beforeSelect={() => {
            beforeSelect()
            resetFilters()
          }}
          afterSelect={() => {
            if (!router.pathname.startsWith(routes.contracts.index)) {
              router.push(routes.contracts.index)
            }
          }}
        />
        <ConfigCmdGroup currentPage={page} pushPage={pushPage} />
        <NodeCmdGroup currentPage={page} pushPage={pushPage} />
      </Command.List>
    </Command>
  )
}
