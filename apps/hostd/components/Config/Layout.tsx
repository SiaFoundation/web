import { Text } from '@siafoundation/design-system'
import { Warning16, CheckmarkFilled16 } from '@siafoundation/react-icons'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'
import { useConfig } from '../../contexts/config'
import { ConfigNav } from './ConfigNav'
import { ConfigActions } from './ConfigActions'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  const { settings, dynDNSCheck } = useConfig()
  return {
    title: 'Configuration',
    routes,
    nav: <ConfigNav />,
    sidenav: <HostdSidenav />,
    stats:
      settings.data?.ddns.provider && !dynDNSCheck.isValidating ? (
        dynDNSCheck.error ? (
          <>
            <Text color="amber">
              <Warning16 />
            </Text>
            <Text size="14">
              Error with dynamic DNS configuration: {dynDNSCheck.error.message}
            </Text>
          </>
        ) : (
          <>
            <Text color="green">
              <CheckmarkFilled16 />
            </Text>
            <Text>Dynamic DNS enabled</Text>
          </>
        )
      ) : null,
    actions: <ConfigActions />,
    openSettings: () => openDialog('settings'),
    size: '3',
  }
}
