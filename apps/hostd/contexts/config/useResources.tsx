import { minutesInMilliseconds } from '@siafoundation/design-system'
import { useSettings, useSettingsDdns } from '@siafoundation/react-hostd'

export function useResources() {
  const settings = useSettings({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
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
    dynDNSCheck,
  }
}
