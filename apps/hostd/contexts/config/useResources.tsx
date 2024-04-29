import { minutesInMilliseconds } from '@siafoundation/design-system'
import {
  useSettings,
  useSettingsDdns,
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
  const dynDNSCheck = useSettingsDdns({
    disabled: !settings.data || !settings.data.ddns.provider,
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
