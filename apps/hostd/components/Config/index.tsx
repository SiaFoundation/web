import { Text, ConfigurationPanel } from '@siafoundation/design-system'
import { Warning16, CheckmarkFilled16 } from '@siafoundation/react-icons'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useConfig } from '../../contexts/config'
import { ConfigNav } from './ConfigNav'
import { StateConnError } from './StateConnError'
import { ConfigActions } from './ConfigActions'

export function Config() {
  const { openDialog } = useDialog()
  const { fields, settings, dynDNSCheck, form, remoteError, configRef } =
    useConfig()
  return (
    <HostdAuthedLayout
      title="Configuration"
      routes={routes}
      nav={<ConfigNav />}
      sidenav={<HostdSidenav />}
      stats={
        settings.data?.ddns.provider && !dynDNSCheck.isValidating ? (
          dynDNSCheck.error ? (
            <>
              <Text color="amber">
                <Warning16 />
              </Text>
              <Text size="14">
                Error with dynamic DNS configuration:{' '}
                {dynDNSCheck.error.message}
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
        ) : null
      }
      actions={<ConfigActions />}
      openSettings={() => openDialog('settings')}
      size="3"
    >
      {remoteError ? (
        <StateConnError />
      ) : (
        <div ref={configRef} className="px-5 py-6 flex flex-col gap-16">
          <ConfigurationPanel
            title="Host"
            category="host"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Pricing"
            category="pricing"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="DNS"
            category="DNS"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Bandwidth"
            category="bandwidth"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Registry"
            category="registry"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Accounts"
            category="RHP3"
            fields={fields}
            form={form}
          />
        </div>
      )}
    </HostdAuthedLayout>
  )
}
