import {
  Text,
  Button,
  triggerSuccessToast,
  triggerErrorToast,
  Reset16,
  Save16,
  Warning16,
  CheckmarkFilled16,
  ConfigurationPanel,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import {} from '@siafoundation/design-system'
import {
  useSettings,
  useSettingsDdns,
  useSettingsUpdate,
} from '@siafoundation/react-hostd'
import { fields, initialValues } from './fields'
import { transformDown, transformUp } from './transform'
import { useForm } from 'react-hook-form'
import { AnnounceButton } from './AnnounceButton'

export function Config() {
  const { openDialog } = useDialog()
  const settings = useSettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const settingsUpdate = useSettingsUpdate()
  const dynDNSCheck = useSettingsDdns({
    disabled: !settings.data || !settings.data.ddns.provider,
    config: {
      swr: {
        revalidateOnFocus: false,
        errorRetryCount: 0,
      },
    },
  })

  const form = useForm({
    mode: 'all',
    defaultValues: initialValues,
  })

  const resetFormData = useCallback(() => {
    if (!settings.data) {
      return
    }
    const s = settings.data
    form.reset(transformDown(s))
  }, [form, settings])

  const revalidateAndResetFormData = useCallback(async () => {
    await settings.mutate()
    resetFormData()
    // also recheck dynamic dns
    await dynDNSCheck.mutate()
  }, [resetFormData, settings, dynDNSCheck])

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (settings.data && !hasInit) {
      resetFormData()
      setHasInit(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.data])

  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (!settings.data) {
        return
      }
      try {
        const response = await settingsUpdate.patch({
          payload: transformUp(values, settings.data),
        })
        if (response.error) {
          throw Error(response.error)
        }
        if (form.formState.dirtyFields.netAddress) {
          triggerSuccessToast(
            'Settings have been saved. Address has changed, make sure to re-announce the host.',
            {
              duration: 20_000,
            }
          )
        } else {
          triggerSuccessToast('Settings have been saved.')
        }
        revalidateAndResetFormData()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [form, settings, settingsUpdate, revalidateAndResetFormData]
  )

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val
  ).length

  return (
    <HostdAuthedLayout
      title="Configuration"
      routes={routes}
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
