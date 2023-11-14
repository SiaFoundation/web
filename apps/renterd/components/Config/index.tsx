import { ConfigurationPanel } from '@siafoundation/design-system'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { useConfig } from '../../contexts/config'
import { ConfigStats } from './ConfigStats'
import { ConfigActions } from './ConfigActions'
import { ConfigNav } from './ConfigNav'

export function Config() {
  const { openDialog } = useDialog()
  const { form, fields } = useConfig()

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      nav={<ConfigNav />}
      sidenav={<RenterdSidenav />}
      stats={<ConfigStats />}
      actions={<ConfigActions />}
      openSettings={() => openDialog('settings')}
    >
      <div className="px-5 py-6 flex flex-col gap-16 max-w-screen-xl">
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
    </RenterdAuthedLayout>
  )
}
