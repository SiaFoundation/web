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
import { ContractsCmd } from '../Contracts/ContractsCmd'
import { Page } from './types'
import { useContracts } from '../../contexts/contracts'
import { HostsCmd } from '../Hosts/HostsCmd'
import { FilesCmd } from '../Files/FilesCmd'
import { useHosts } from '../../contexts/hosts'
import { useDebounce } from 'use-debounce'
import { CmdEmptyDefault } from './CmdEmpty'
import { useRenterd } from '../../contexts/renterd'

type Props = {
  panel?: boolean
}

export function CmdRoot({ panel }: Props) {
  const { resetFilters: resetContractsFilters } = useContracts()
  const { resetFilters: resetHostsFilters } = useHosts()
  const { autopilotMode } = useRenterd()
  const { closeDialog } = useDialog()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [pages, setPages] = useState<Page[]>([])
  const page: Page | undefined = pages[pages.length - 1]
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

  const afterSelect = useCallback(() => {
    setSearch('')
  }, [setSearch])

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
      {page && <Label className="px-2">{page.label}</Label>}
      <Command.Input
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
        <FilesCmd
          debouncedSearch={debouncedSearch}
          search={search}
          currentPage={page}
          pushPage={pushPage}
          beforeSelect={() => {
            beforeSelect()
          }}
          afterSelect={() => {
            afterSelect()
          }}
        />
        {autopilotMode === 'on' && (
          <AutopilotCmdGroup currentPage={page} pushPage={pushPage} />
        )}
        <WalletCmdGroup currentPage={page} pushPage={pushPage} />
        <ContractsCmd
          currentPage={page}
          pushPage={pushPage}
          beforeSelect={() => {
            beforeSelect()
            resetContractsFilters()
          }}
          afterSelect={() => {
            if (!router.pathname.startsWith(routes.contracts.index)) {
              router.push(routes.contracts.index)
            }
            afterSelect()
          }}
        />
        <HostsCmd
          currentPage={page}
          pushPage={pushPage}
          beforeSelect={() => {
            beforeSelect()
            resetHostsFilters()
          }}
          afterSelect={() => {
            if (!router.pathname.startsWith(routes.hosts.index)) {
              router.push(routes.hosts.index)
            }
            afterSelect()
          }}
        />
        <ConfigCmdGroup currentPage={page} pushPage={pushPage} />
        <NodeCmdGroup currentPage={page} pushPage={pushPage} />
      </Command.List>
    </Command>
  )
}
