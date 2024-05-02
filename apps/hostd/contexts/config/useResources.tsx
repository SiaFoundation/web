import { minutesInMilliseconds } from '@siafoundation/design-system'
import {
  useSettings,
  useSettingsDdnsUpdate,
  useSettingsPinned,
} from '@siafoundation/hostd-react'

export function useResources() {
  const settings = useSettings({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const settingsPinned = useSettingsPinned({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
        errorRetryCount: 0,
      },
    },
  })
  const dynDNSCheck = useSettingsDdnsUpdate({
    config: {
      swr: {
        revalidateOnFocus: false,
        errorRetryCount: 0,
      },
    },
  })

  return {
    settings,
    settingsPinned,
    dynDNSCheck,
  }
}
