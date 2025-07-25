import { Switch, Tooltip } from '@siafoundation/design-system'
import {
  useSettingsContracts,
  useSettingsContractsUpdate,
} from '@siafoundation/indexd-react'
import { useCallback } from 'react'

type Props = {
  size: 'small' | 'medium'
}

export function ConfigEnabledSwitch({ size }: Props) {
  const settingsContractsUpdate = useSettingsContractsUpdate()
  const settingsContracts = useSettingsContracts()

  const toggleEnabled = useCallback(() => {
    if (!settingsContracts.data) {
      return
    }
    settingsContractsUpdate.put({
      payload: {
        ...settingsContracts.data,
        enabled: !settingsContracts.data?.enabled,
      },
    })
  }, [settingsContracts.data, settingsContractsUpdate])

  return (
    <Tooltip content="Enable or disable forming contracts and maintaining data.">
      <div>
        <Switch
          size={size}
          checked={!!settingsContracts.data?.enabled}
          onCheckedChange={toggleEnabled}
        />
      </div>
    </Tooltip>
  )
}
