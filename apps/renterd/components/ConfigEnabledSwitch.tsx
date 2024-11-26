import { Switch, Tooltip } from '@siafoundation/design-system'
import {
  useAutopilotConfig,
  useAutopilotConfigUpdate,
} from '@siafoundation/renterd-react'
import { useCallback } from 'react'

type Props = {
  size: 'small' | 'medium'
}

export function ConfigEnabledSwitch({ size }: Props) {
  const autopilotConfigUpdate = useAutopilotConfigUpdate()
  const autopilotConfig = useAutopilotConfig()

  const toggleEnabled = useCallback(() => {
    if (!autopilotConfig.data) {
      return
    }
    autopilotConfigUpdate.put({
      payload: {
        ...autopilotConfig.data,
        enabled: !autopilotConfig.data?.enabled,
      },
    })
  }, [autopilotConfig.data, autopilotConfigUpdate])

  return (
    <Tooltip content="Enable or disable the system autopilot which handles forming contracts and maintaining files.">
      <div>
        <Switch
          size={size}
          checked={!!autopilotConfig.data?.enabled}
          onCheckedChange={toggleEnabled}
        />
      </div>
    </Tooltip>
  )
}
