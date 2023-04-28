import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { Text } from '@siafoundation/design-system'

export default function Config() {
  const { openDialog } = useDialog()
  return (
    <HostdAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
    >
      <Text>hello</Text>
    </HostdAuthedLayout>
  )
}
