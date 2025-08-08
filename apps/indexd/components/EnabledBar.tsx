import { AppDockedControl, Panel, Text } from '@siafoundation/design-system'
import { useSettingsContracts } from '@siafoundation/indexd-react'
import { ConfigEnabledSwitch } from './ConfigEnabledSwitch'
import { Warning24 } from '@siafoundation/react-icons'

export function EnabledBar() {
  const settingsContracts = useSettingsContracts()

  if (!settingsContracts.data) {
    return <AppDockedControl />
  }

  if (settingsContracts.data.enabled) {
    return <AppDockedControl />
  }

  return (
    <AppDockedControl>
      <div className="flex justify-center">
        <Panel className="w-[400px] flex flex-col gap-2 max-h-[600px] p-3">
          <div className="flex gap-1 items-center">
            <Text size="18" weight="medium" color="contrast">
              <Warning24 />
            </Text>
            <Text size="18" weight="medium" color="contrast">
              System is currently disabled
            </Text>
            <div className="flex-1" />
            <ConfigEnabledSwitch size="medium" />
          </div>
          <Text size="12" color="subtle">
            Enable the system to form contracts and maintain files. Make sure to
            configure your desired settings before enabling.
          </Text>
        </Panel>
      </div>
    </AppDockedControl>
  )
}
