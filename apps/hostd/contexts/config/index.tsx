import { createContext, useContext } from 'react'
import {
  triggerSuccessToast,
  triggerErrorToast,
  useOnInvalid,
  minutesInMilliseconds,
} from '@siafoundation/design-system'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  HostSettings,
  useSettings,
  useSettingsDdns,
  useSettingsUpdate,
} from '@siafoundation/react-hostd'
import { SettingsData, initialValues } from './types'
import { getFields } from './fields'
import { calculateMaxCollateral, transformDown, transformUp } from './transform'
import { useForm } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'
import { useAppSettings } from '@siafoundation/react-core'
import { useSiaCentralExchangeRates } from '@siafoundation/react-sia-central'

export function useConfigMain() {
  const settings = useSettings({
    standalone: 'configSettingsForm',
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
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
  const [showAdvanced, setShowAdvanced] = useLocalStorageState<boolean>(
    'v0/config/showAdvanced',
    {
      defaultValue: false,
    }
  )

  const form = useForm({
    mode: 'all',
    defaultValues: initialValues,
  })
  const storageTBMonth = form.watch('storagePrice')
  const collateralMultiplier = form.watch('collateralMultiplier')

  const resetFormData = useCallback(
    (data: HostSettings) => {
      const settingsData = transformDown(data)
      form.reset(settingsData)
      return settingsData
    },
    [form]
  )

  const didDataRevalidate = useMemo(() => [settings.data], [settings.data])

  const resetFormDataIfAllDataFetched = useCallback((): SettingsData | null => {
    if (settings.data) {
      return resetFormData(settings.data)
    }
    return null
  }, [resetFormData, settings.data])

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (!hasInit) {
      const didReset = resetFormDataIfAllDataFetched()
      if (didReset) {
        setHasInit(true)
      }
    }
  }, [hasInit, resetFormDataIfAllDataFetched])

  const revalidateAndResetFormData = useCallback(async () => {
    const data = await settings.mutate()
    if (!data) {
      triggerErrorToast('Error fetching settings.')
    } else {
      resetFormData(data)
      // also recheck dynamic dns
      await dynDNSCheck.mutate()
    }
  }, [settings, resetFormData, dynDNSCheck])

  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (!settings.data) {
        return
      }
      try {
        const calculatedValues: Partial<SettingsData> = {}
        if (!showAdvanced) {
          calculatedValues.maxCollateral = calculateMaxCollateral(
            values.storagePrice,
            values.collateralMultiplier
          )
        }

        const finalValues = {
          ...values,
          ...calculatedValues,
        }

        const response = await settingsUpdate.patch({
          payload: transformUp(finalValues, settings.data),
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
        await revalidateAndResetFormData()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [form, showAdvanced, settings, settingsUpdate, revalidateAndResetFormData]
  )

  const rates = useSiaCentralExchangeRates()
  const fields = useMemo(
    () =>
      getFields({
        showAdvanced,
        storageTBMonth,
        collateralMultiplier,
        rates: rates.data?.rates,
      }),
    [showAdvanced, storageTBMonth, collateralMultiplier, rates.data]
  )

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  // Resets so that stale values that are no longer in sync with what is on
  // the daemon will show up as changed.
  const resetWithUserChanges = useCallback(() => {
    const currentFormValues = form.getValues()
    const serverFormValues = resetFormDataIfAllDataFetched()
    if (!serverFormValues) {
      return
    }
    form.reset(serverFormValues)
    for (const [key, value] of Object.entries(currentFormValues)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setValue(key as any, value, {
        shouldDirty: true,
      })
    }
  }, [form, resetFormDataIfAllDataFetched])

  const { isUnlockedAndAuthedRoute } = useAppSettings()
  useEffect(() => {
    if (isUnlockedAndAuthedRoute) {
      revalidateAndResetFormData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnlockedAndAuthedRoute])

  useEffect(() => {
    if (form.formState.isSubmitting) {
      return
    }
    resetWithUserChanges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form,
    // if form mode is toggled reset
    showAdvanced,
    // if any of the settings are revalidated reset
    didDataRevalidate,
  ])

  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val
  ).length

  return {
    fields,
    settings,
    dynDNSCheck,
    changeCount,
    revalidateAndResetFormData,
    form,
    onSubmit,
    showAdvanced,
    setShowAdvanced,
  }
}

type State = ReturnType<typeof useConfigMain>

const ConfigContext = createContext({} as State)
export const useConfig = () => useContext(ConfigContext)

type Props = {
  children: React.ReactNode
}

export function ConfigProvider({ children }: Props) {
  const state = useConfigMain()
  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  )
}
