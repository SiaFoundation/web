import { routes } from '../../config/routes'
import { useRouter } from 'next/navigation'
import { useDialog } from '../../contexts/dialog'
import { CommandGroup, CommandItemNav, CommandItemSearch } from './Item'
import { Page } from './types'
import { useConfig } from '../../contexts/config'

const commandPage = {
  namespace: 'configuration',
  label: 'Configuration',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function ConfigCmdGroup({ currentPage, parentPage, pushPage }: Props) {
  const router = useRouter()
  const { configViewMode } = useConfig()
  const { closeDialog } = useDialog()
  return (
    <CommandGroup currentPage={currentPage} commandPage={commandPage}>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(commandPage)
        }}
      >
        {commandPage.label}
      </CommandItemNav>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.index)
          closeDialog()
        }}
      >
        Open configuration
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.host)
          closeDialog()
        }}
      >
        Configure host
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.pricing)
          closeDialog()
        }}
      >
        Configure pricing
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.dns)
          closeDialog()
        }}
      >
        Configure DNS
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          router.push(routes.config.bandwidth)
          closeDialog()
        }}
      >
        Configure bandwidth
      </CommandItemSearch>
      {configViewMode === 'advanced' && (
        <>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.registry)
              closeDialog()
            }}
          >
            Configure registry
          </CommandItemSearch>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.accounts)
              closeDialog()
            }}
          >
            Configure accounts
          </CommandItemSearch>
        </>
      )}
    </CommandGroup>
  )
}
