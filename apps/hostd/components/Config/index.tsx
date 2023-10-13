import { Text, Button, ConfigurationPanel } from '@siafoundation/design-system'
import {
  Reset16,
  Save16,
  Warning16,
  CheckmarkFilled16,
} from '@siafoundation/react-icons'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { AnnounceButton } from './AnnounceButton'
import { useConfig } from '../../contexts/config'
import { ConfigNav } from './ConfigNav'

export function Config() {
  const { openDialog } = useDialog()
  const {
    fields,
    settings,
    dynDNSCheck,
    changeCount,
    revalidateAndResetFormData,
    form,
    onSubmit,
  } = useConfig()
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
      actions={
        <div className="flex items-center gap-2">
          {!!changeCount && (
            <Text size="12" color="subtle">
              {changeCount === 1 ? '1 change' : `${changeCount} changes`}
            </Text>
          )}
          <Button
            tip="Reset all changes"
            icon="contrast"
            disabled={!changeCount}
            onClick={revalidateAndResetFormData}
          >
            <Reset16 />
          </Button>
          <Button
            tip="Save all changes"
            variant="accent"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
            onClick={onSubmit}
          >
            <Save16 />
            Save changes
          </Button>
          <AnnounceButton />
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="p-6 flex flex-col gap-16 max-w-screen-xl">
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
    </HostdAuthedLayout>
  )
}
