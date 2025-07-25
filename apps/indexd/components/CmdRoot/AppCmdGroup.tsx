import { useTheme } from 'next-themes'
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
  const { setTheme } = useTheme()
  const { lock, currencyOptions, setCurrency } = useAppSettings()
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
      <CommandItemRootAndSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          lock()
          closeDialog()
        }}
      >
        Lock indexd
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
          setTheme('system')
          closeDialog()
        }}
      >
        Set theme to system preference
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
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
          openDialog('bugReport')
        }}
      >
        Generate a bug report
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
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open security settings menu
      </CommandItemSearch>
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open privacy settings menu
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
