import { Label, useTheme } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { useDialog } from '../../contexts/dialog'
import {
  CommandGroup,
  CommandItemRootAndPage,
  CommandItemRootSearchAndPage,
} from './Item'

const commandPage = 'Settings'

type Props = {
  page: string
  pushPage: (page: string) => void
}

export function CommandKApp({ page, pushPage }: Props) {
  const { openDialog, closeDialog } = useDialog()
  const { setMode, setTheme } = useTheme()
  const { settings, setSettings, lock, currencyOptions, setCurrency } =
    useAppSettings()
  return (
    <CommandGroup
      currentPage={page}
      commandPage={commandPage}
      heading={<Label>Application</Label>}
    >
      <CommandItemRootAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open settings
      </CommandItemRootAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          setSettings({ siaCentral: !settings.siaCentral })
        }}
      >
        {(settings.siaCentral ? 'Disable' : 'Enable') +
          ' external API - Sia Central exchange rates'}
      </CommandItemRootSearchAndPage>
      <CommandItemRootAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          lock()
          closeDialog()
        }}
      >
        Lock renterd
      </CommandItemRootAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open interface theme menu
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          setMode('system')
          closeDialog()
        }}
      >
        Set theme to system preference
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          setMode('user')
          setTheme('dark')
          closeDialog()
        }}
      >
        Set theme to dark
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          setMode('user')
          setTheme('light')
          closeDialog()
        }}
      >
        Set theme to light
      </CommandItemRootSearchAndPage>
      <CommandItemRootSearchAndPage
        currentPage={page}
        commandPage={commandPage}
        onSelect={() => {
          openDialog('settings')
        }}
      >
        Open currency settings menu
      </CommandItemRootSearchAndPage>
      {currencyOptions.map(({ id, label }) => (
        <CommandItemRootSearchAndPage
          key={id}
          currentPage={page}
          commandPage={commandPage}
          onSelect={() => {
            setCurrency(id)
            closeDialog()
          }}
        >
          {`Set currency to ${label}`}
        </CommandItemRootSearchAndPage>
      ))}
    </CommandGroup>
  )
}
