import React, { createContext, useContext } from 'react'
import {
  triggerSuccessToast,
  triggerErrorToast,
  useOnInvalid,
  monthsToBlocks,
  TBToBytes,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AutopilotConfig,
  autopilotHostsKey,
  useAutopilotConfig,
  useAutopilotConfigUpdate,
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
  useSettingUpdate,
} from '@siafoundation/react-renterd'
import { toScale, toSiacoins } from '@siafoundation/sia-js'
import { getFields } from './fields'
import { SettingsData, defaultValues } from './types'
import {
  getRedundancyMultiplier,
  getRedundancyMultiplierIfIncluded,
  transformDown,
  transformUpAutopilot,
  transformUpConfigApp,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
  transformUpUploadPacking,
} from './transform'
import { useForm } from 'react-hook-form'
import { useSyncContractSet } from './useSyncContractSet'
import { delay, useMutate } from '@siafoundation/react-core'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import {
  ConfigDisplayOptions,
  configDisplayOptionsKey,
  useConfigDisplayOptions,
} from '../../hooks/useConfigDisplayOptions'
import { useGougingSettings } from '../../hooks/useGougingSettings'
import { useRedundancySettings } from '../../hooks/useRedundancySettings'
import { useUploadPackingSettings } from '../../hooks/useUploadPackingSettings'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-sia-central'
import useLocalStorageState from 'use-local-storage-state'
import { useApp } from '../app'

export function useConfigMain() {
  const app = useApp()
  const isAutopilotEnabled = app.autopilot.status === 'on'
  // settings that 404 when empty
  const autopilot = useAutopilotConfig({
    disabled: !isAutopilotEnabled,
    standalone: 'configFormAutopilot',
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  const contractSet = useContractSetSettings({
    standalone: 'configFormContractSet',
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  const configApp = useConfigDisplayOptions({
    standalone: 'configFormConfigApp',
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  // settings with initial defaults
  const gouging = useGougingSettings({
    standalone: 'configFormGouging',
  })
  const redundancy = useRedundancySettings({
    standalone: 'configFormRedundancy',
  })
  const uploadPacking = useUploadPackingSettings({
    standalone: 'configFormUploadPacking',
  })

  const settingUpdate = useSettingUpdate()

  const averages = useSiaCentralHostsNetworkAverages({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const [showAdvanced, setShowAdvanced] = useLocalStorageState<boolean>(
    'v0/config/showAdvanced',
    {
      defaultValue: false,
    }
  )
  const {
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
  } = useSyncContractSet()
  const autopilotUpdate = useAutopilotConfigUpdate()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const resetFormData = useCallback(
    (
      autopilotData: AutopilotConfig | undefined,
      contractSetData: ContractSetSettings | undefined,
      uploadPackingData: UploadPackingSettings,
      gougingData: GougingSettings,
      redundancyData: RedundancySettings,
      configAppData: ConfigDisplayOptions | undefined
    ) => {
      const settingsData = transformDown(
        autopilotData,
        contractSetData,
        uploadPackingData,
        gougingData,
        redundancyData,
        configAppData
      )
      form.reset(settingsData)
      return settingsData
    },
    [form]
  )

  const didDataRevalidate = useMemo(
    () => [
      autopilot.data,
      autopilot.error,
      contractSet.data,
      contractSet.error,
      uploadPacking.data,
      gouging.data,
      redundancy.data,
      configApp.data,
      configApp.error,
    ],
    [
      autopilot.data,
      autopilot.error,
      contractSet.data,
      contractSet.error,
      uploadPacking.data,
      gouging.data,
      redundancy.data,
      configApp.data,
      configApp.error,
    ]
  )

  const resetFormDataIfAllDataFetched = useCallback((): SettingsData | null => {
    if (
      (!isAutopilotEnabled || autopilot.data || autopilot.error) &&
      gouging.data &&
      redundancy.data &&
      uploadPacking.data &&
      (contractSet.data || contractSet.error) &&
      (configApp.data || configApp.error)
    ) {
      return resetFormData(
        autopilot.data,
        contractSet.data,
        uploadPacking.data,
        gouging.data,
        redundancy.data,
        configApp.data
      )
    }
    return null
  }, [
    isAutopilotEnabled,
    resetFormData,
    autopilot.data,
    autopilot.error,
    contractSet.data,
    contractSet.error,
    uploadPacking.data,
    gouging.data,
    redundancy.data,
    configApp.data,
    configApp.error,
  ])

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (app.autopilot.status === 'init') {
      return
    }
    if (!hasInit) {
      const didReset = resetFormDataIfAllDataFetched()
      if (didReset) {
        setHasInit(true)
      }
    }
  }, [hasInit, app.autopilot.status, resetFormDataIfAllDataFetched])

  const revalidateAndResetFormData = useCallback(async () => {
    const autopilotData = isAutopilotEnabled
      ? await autopilot.mutate()
      : undefined
    const contractSetData = await contractSet.mutate()
    const gougingData = await gouging.mutate()
    const redundancyData = await redundancy.mutate()
    const uploadPackingData = await uploadPacking.mutate()
    const configAppData = await configApp.mutate()
    if (!gougingData || !redundancyData) {
      triggerErrorToast('Error fetching settings.')
    } else {
      resetFormData(
        autopilotData,
        contractSetData,
        uploadPackingData,
        gougingData,
        redundancyData,
        configAppData
      )
    }
  }, [
    isAutopilotEnabled,
    autopilot,
    contractSet,
    gouging,
    uploadPacking,
    redundancy,
    configApp,
    resetFormData,
  ])

  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')
  const includeRedundancyMaxStoragePrice = form.watch(
    'includeRedundancyMaxStoragePrice'
  )
  const includeRedundancyMaxUploadPrice = form.watch(
    'includeRedundancyMaxUploadPrice'
  )
  const storageTB = form.watch('storageTB')
  const allowanceMonth = form.watch('allowanceMonth')
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')

  const redundancyMultiplier = useMemo(
    () => getRedundancyMultiplier(minShards, totalShards),
    [minShards, totalShards]
  )
  const fields = useMemo(() => {
    if (averages.data) {
      return getFields({
        isAutopilotEnabled,
        showAdvanced,
        redundancyMultiplier,
        includeRedundancyMaxStoragePrice,
        includeRedundancyMaxUploadPrice,
        storageAverage: toSiacoins(averages.data.settings.storage_price) // bytes/block
          .times(monthsToBlocks(1)) // bytes/month
          .times(TBToBytes(1)) // TB/month
          .times(
            getRedundancyMultiplierIfIncluded(
              minShards,
              totalShards,
              includeRedundancyMaxStoragePrice
            )
          ), // redundancy
        uploadAverage: toSiacoins(averages.data.settings.upload_price) // bytes
          .times(TBToBytes(1)) // TB
          .times(
            getRedundancyMultiplierIfIncluded(
              minShards,
              totalShards,
              includeRedundancyMaxUploadPrice
            )
          ), // redundancy
        downloadAverage: toSiacoins(averages.data.settings.download_price) // bytes
          .times(TBToBytes(1)), // TB
        contractAverage: toSiacoins(averages.data.settings.contract_price),
      })
    }
    return getFields({
      isAutopilotEnabled,
      showAdvanced,
      redundancyMultiplier,
      includeRedundancyMaxStoragePrice,
      includeRedundancyMaxUploadPrice,
    })
  }, [
    isAutopilotEnabled,
    showAdvanced,
    averages.data,
    redundancyMultiplier,
    minShards,
    totalShards,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
  ])

  const mutate = useMutate()
  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const firstTimeSettingConfig = isAutopilotEnabled && !autopilot.data
        const autopilotResponse = isAutopilotEnabled
          ? await autopilotUpdate.put({
              payload: transformUpAutopilot(values, autopilot.data),
            })
          : undefined
        const contractSetResponse = await settingUpdate.put({
          params: {
            key: 'contractset',
          },
          payload: transformUpContractSet(values, contractSet.data),
        })
        const uploadPackingResponse = await settingUpdate.put({
          params: {
            key: 'uploadpacking',
          },
          payload: transformUpUploadPacking(values, uploadPacking.data),
        })
        const gougingResponse = await settingUpdate.put({
          params: {
            key: 'gouging',
          },
          payload: transformUpGouging(values, gouging.data),
        })
        const redundancyResponse = await settingUpdate.put({
          params: {
            key: 'redundancy',
          },
          payload: transformUpRedundancy(values, redundancy.data),
        })
        const configAppResponse = await settingUpdate.put({
          params: {
            key: configDisplayOptionsKey,
          },
          payload: transformUpConfigApp(values, configApp.data),
        })
        if (autopilotResponse?.error) {
          throw Error(autopilotResponse.error)
        }
        if (contractSetResponse.error) {
          throw Error(contractSetResponse.error)
        }
        if (uploadPackingResponse.error) {
          throw Error(uploadPackingResponse.error)
        }
        if (gougingResponse.error) {
          throw Error(gougingResponse.error)
        }
        if (redundancyResponse.error) {
          throw Error(redundancyResponse.error)
        }
        if (configAppResponse.error) {
          throw Error(configAppResponse.error)
        }

        triggerSuccessToast('Configuration has been saved.')
        if (isAutopilotEnabled) {
          syncDefaultContractSet(values.autopilotContractSet)
        }

        // if autopilot is being configured for the first time,
        // revalidate the empty hosts list.
        if (firstTimeSettingConfig) {
          const refreshHostsAfterDelay = async () => {
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsKey))
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsKey))
          }
          refreshHostsAfterDelay()
        }

        await revalidateAndResetFormData()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [
      isAutopilotEnabled,
      autopilot,
      autopilotUpdate,
      revalidateAndResetFormData,
      syncDefaultContractSet,
      mutate,
      settingUpdate,
      contractSet,
      uploadPacking,
      redundancy,
      gouging,
      configApp,
    ]
  )

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const canEstimate = useMemo(() => {
    if (!isAutopilotEnabled) {
      return false
    }
    return !(
      !storageTB ||
      !allowanceMonth ||
      storageTB.isZero() ||
      allowanceMonth.isZero()
    )
  }, [isAutopilotEnabled, storageTB, allowanceMonth])

  const estimatedSpendingPerMonth = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    return toScale(allowanceMonth, 0)
  }, [canEstimate, allowanceMonth])

  const estimatedSpendingPerTB = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    const estimatedSpendingPerMonthTB = estimatedSpendingPerMonth.div(storageTB)
    return toScale(estimatedSpendingPerMonthTB, 0)
  }, [canEstimate, estimatedSpendingPerMonth, storageTB])

  // if simple mode, then calculate and set allowance when dependent values change
  useEffect(() => {
    if (
      !showAdvanced &&
      storageTB?.isGreaterThan(0) &&
      maxStoragePriceTBMonth?.isGreaterThan(0)
    ) {
      form.setValue(
        'allowanceMonth',
        maxStoragePriceTBMonth
          .times(storageTB)
          .times(
            !includeRedundancyMaxStoragePrice
              ? getRedundancyMultiplier(minShards, totalShards)
              : 1
          ),
        {
          shouldDirty: true,
        }
      )
    }
  }, [
    form,
    showAdvanced,
    storageTB,
    maxStoragePriceTBMonth,
    minShards,
    totalShards,
    includeRedundancyMaxStoragePrice,
  ])

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
    onSubmit,
    revalidateAndResetFormData,
    form,
    fields,
    changeCount,
    canEstimate,
    estimatedSpendingPerMonth,
    estimatedSpendingPerTB,
    redundancyMultiplier,
    storageTB,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
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
