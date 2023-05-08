import {
  Text,
  Button,
  triggerSuccessToast,
  triggerErrorToast,
  Reset16,
  Save16,
  ConfigurationPanel,
} from '@siafoundation/design-system'
import { useCallback, useEffect, useMemo } from 'react'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import {
  GougingSettings,
  RedundancySettings,
  useSetting,
  useSettingUpdate,
} from '@siafoundation/react-renterd'
import { initialValues, fields } from './fields'
import {
  transformDown,
  transformUpGouging,
  transformUpRedundancy,
} from './transform'
import { FieldErrors, useForm } from 'react-hook-form'
import { entries } from 'lodash'

export function Config() {
  const { openDialog } = useDialog()
  const gouging = useSetting({
    params: { key: 'gouging' },
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const redundancy = useSetting({
    params: { key: 'redundancy' },
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })

  const settingUpdate = useSettingUpdate()

  const form = useForm({
    mode: 'all',
    defaultValues: initialValues,
  })

  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const gougingResponse = await settingUpdate.put({
          params: {
            key: 'gouging',
          },
          payload: transformUpGouging(
            values,
            gouging.data as Record<string, unknown>
          ),
        })
        const redundancyResponse = await settingUpdate.put({
          params: {
            key: 'redundancy',
          },
          payload: transformUpRedundancy(
            values,
            redundancy.data as Record<string, unknown>
          ),
        })
        if (gougingResponse.error) {
          throw Error(gougingResponse.error)
        }
        if (redundancyResponse.error) {
          throw Error(redundancyResponse.error)
        }
        triggerSuccessToast('Configuration has been saved.')
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [settingUpdate, redundancy, gouging]
  )

  const onInvalid = useCallback((errors: FieldErrors<typeof initialValues>) => {
    triggerErrorToast(
      entries(errors)
        .map(([key, e]) => `${fields[key].title}: ${e.message}`)
        .join(', ')
    )
  }, [])

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val
  ).length

  const resetFormData = useCallback(() => {
    if (!gouging.data || !redundancy.data) {
      return
    }
    const gougingData = gouging.data as GougingSettings
    const redundancyData = redundancy.data as RedundancySettings
    form.reset(transformDown(gougingData, redundancyData))
  }, [form, gouging.data, redundancy.data])

  const revalidateAndResetFormData = useCallback(async () => {
    await gouging.mutate()
    await redundancy.mutate()
    // Theoretically mutate should trigger the init effect,
    // but for some reason it does not (maybe when the response is cached?)
    // therefore we manually call form.reset.
    resetFormData()
  }, [resetFormData, gouging, redundancy])

  // init - when new config is fetched, reset the form
  useEffect(() => {
    resetFormData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gouging.data, redundancy.data])

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<RenterdSidenav />}
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
            onClick={() => revalidateAndResetFormData()}
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
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="p-6 flex flex-col gap-16 max-w-screen-xl">
        <ConfigurationPanel
          title="Gouging"
          category="gouging"
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
