import { AppDockedControl, Panel, Text } from '@siafoundation/design-system'
import { useAutopilotConfig } from '@siafoundation/renterd-react'
import { ConfigEnabledSwitch } from './ConfigEnabledSwitch'
import { Warning24 } from '@carbon/icons-react'

export function EnabledBar() {
  const autopilotConfig = useAutopilotConfig()

  if (!autopilotConfig.data) {
    return <AppDockedControl />
  }

  if (autopilotConfig.data.enabled) {
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
              Autopilot is currently disabled
            </Text>
            <div className="flex-1" />
            <ConfigEnabledSwitch size="medium" />
          </div>
          <Text size="12" color="subtle">
            Enable autopilot to form contracts and maintain files.
          </Text>
        </Panel>
      </div>
    </AppDockedControl>
  )
}
