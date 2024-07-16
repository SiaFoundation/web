import { ConfigurationPanel } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useConfig } from '../../contexts/config'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'
import { ConfigActions } from './ConfigActions'
import { ConfigNav } from './ConfigNav'
import { ConfigStats } from './ConfigStats'
import { Recommendations } from './Recommendations'
import { StateConnError } from './StateConnError'

export function Config() {
  const { openDialog } = useDialog()
  const { form, fields, remoteError, configRef } = useConfig()

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      nav={<ConfigNav />}
      sidenav={<RenterdSidenav />}
      stats={<ConfigStats />}
      actions={<ConfigActions />}
      after={<Recommendations />}
      openSettings={() => openDialog('settings')}
      size="3"
    >
      {remoteError ? (
        <StateConnError />
      ) : (
        <div ref={configRef} className="px-5 py-6 flex flex-col gap-16">
          <ConfigurationPanel
            title="Storage"
            category="storage"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Pricing"
            category="gouging"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Hosts"
            category="hosts"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Wallet"
            category="wallet"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Contracts"
            category="contractset"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Uploads"
            category="uploadpacking"
            fields={fields}
            form={form}
          />
          <ConfigurationPanel
            title="Redundancy"
            category="redundancy"
            fields={fields}
            form={form}
          />
        </div>
      )}
    </RenterdAuthedLayout>
  )
}
