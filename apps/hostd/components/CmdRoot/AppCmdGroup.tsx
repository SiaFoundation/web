import { useTheme } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { useDialog } from '../../contexts/dialog'
import {
  CommandGroup,
  CommandItemNav,
  CommandItemRootAndSearch,
  CommandItemSearch,
} from './Item'
import { Page } from './types'

const commandPage = {
  namespace: 'settings',
  label: 'Settings',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function AppCmdGroup({ currentPage, parentPage }: Props) {
  const { openDialog, closeDialog } = useDialog()
  const { setMode, setTheme } = useTheme()
  const { settings, setSettings, lock, currencyOptions, setCurrency } =
    useAppSettings()
  return (
    <CommandGroup currentPage={currentPage} commandPage={commandPage}>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open settings
      </CommandItemNav>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          setSettings({ siaCentral: !settings.siaCentral })
          closeDialog()
        }}
      >
        {(settings.siaCentral ? 'Disable' : 'Enable') +
          ' external API - Sia Central exchange rates'}
      </CommandItemSearch>
      <CommandItemRootAndSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          lock()
          closeDialog()
        }}
      >
        Lock hostd
      </CommandItemRootAndSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open interface theme menu
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          setMode('system')
          closeDialog()
        }}
      >
        Set theme to system preference
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          setMode('user')
          setTheme('dark')
          closeDialog()
        }}
      >
        Set theme to dark
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          setMode('user')
          setTheme('light')
          closeDialog()
        }}
      >
        Set theme to light
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open currency settings menu
      </CommandItemSearch>
      {currencyOptions.map(({ id, label }) => (
        <CommandItemSearch
          key={id}
          currentPage={currentPage}
          commandPage={commandPage}
          onSelect={() => {
            setCurrency(id)
            closeDialog()
          }}
        >
          {`Set currency to ${label}`}
        </CommandItemSearch>
      ))}
    </CommandGroup>
  )
}
