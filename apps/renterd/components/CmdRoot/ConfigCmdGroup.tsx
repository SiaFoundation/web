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
          router.push(routes.config.storage)
          closeDialog()
        }}
      >
        Configure storage
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
      {configViewMode === 'advanced' && (
        <>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.hosts)
              closeDialog()
            }}
          >
            Configure hosts
          </CommandItemSearch>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.wallet)
              closeDialog()
            }}
          >
            Configure wallet
          </CommandItemSearch>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.contracts)
              closeDialog()
            }}
          >
            Configure contracts
          </CommandItemSearch>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.uploads)
              closeDialog()
            }}
          >
            Configure uploads
          </CommandItemSearch>
          <CommandItemSearch
            currentPage={currentPage}
            commandPage={commandPage}
            onSelect={() => {
              router.push(routes.config.redundancy)
              closeDialog()
            }}
          >
            Configure redundancy
          </CommandItemSearch>
        </>
      )}
    </CommandGroup>
  )
}
