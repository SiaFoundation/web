import React, { createContext, useContext } from 'react'
import {
  triggerErrorToast,
  useOnInvalid,
  useServerSyncedForm,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { useBusState, GougingSettings } from '@siafoundation/react-renterd'
import { getFields } from './fields'
import { SettingsData, getAdvancedDefaults } from './types'
import { transformDown } from './transform'
import { useAppSettings } from '@siafoundation/react-core'
import { TBToBytes } from '@siafoundation/units'
import { useResources } from './useResources'
import { useOnValid } from './useOnValid'
import { useEstimates } from './useEstimates'
import { useForm } from './useForm'
import { useAverages } from './useAverages'

export function useConfigMain() {
  const {
    app,
    isAutopilotEnabled,
    autopilot,
    contractSet,
    configApp,
    gouging,
    redundancy,
    uploadPacking,
    settingUpdate,
    averages,
    showAdvanced,
    setShowAdvanced,
    mode,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
    autopilotUpdate,
    appSettings,
  } = useResources()

  const {
    form,
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    minShards,
    totalShards,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
    redundancyMultiplier,
  } = useForm()

  const { storageAverage, uploadAverage, downloadAverage, contractAverage } =
    useAverages({
      minShards,
      totalShards,
      includeRedundancyMaxStoragePrice,
      includeRedundancyMaxUploadPrice,
    })

  // Override gouging data defaults with sia central averages.
  // We override the remote data so that the values appear as the defaults.
  // If we just changed the form values they would appear as a user change.
  const buildGougingData = useCallback(
    (gougingData: GougingSettings): GougingSettings => {
      // wait for gouging data and for ap to be initialized
      if (!gougingData || app.autopilot.status === 'init') {
        return null
      }
      // if sia central is disabled, we cant override with averages
      if (!appSettings.settings.siaCentral) {
        return gougingData
      }
      // already configured, the user has changed the defaults
      if (app.autopilot.state.data?.configured) {
        return gougingData
      }
      if (averages.isLoading) {
        return null
      }
      // first time user, override defaults
      if (averages.data) {
        return {
          ...gougingData,
          maxStoragePrice: averages.data?.settings.storage_price,
          maxDownloadPrice: new BigNumber(
            averages.data?.settings.download_price
          )
            .times(TBToBytes(1))
            .toString(),
          maxUploadPrice: new BigNumber(averages.data?.settings.upload_price)
            .times(TBToBytes(1))
            .toString(),
        }
      }
      return gougingData
    },
    [
      averages.data,
      averages.isLoading,
      appSettings.settings.siaCentral,
      app.autopilot.status,
      app.autopilot.state.data?.configured,
    ]
  )

  const remoteValues: SettingsData = useMemo(() => {
    const gougingData = buildGougingData(gouging.data)
    if (
      (!isAutopilotEnabled || autopilot.data || autopilot.error) &&
      gougingData &&
      redundancy.data &&
      uploadPacking.data &&
      (contractSet.data || contractSet.error) &&
      (configApp.data || configApp.error)
    ) {
      return transformDown({
        autopilotData: autopilot.data,
        contractSetData: contractSet.data,
        uploadPackingData: uploadPacking.data,
        gougingData,
        redundancyData: redundancy.data,
        configAppData: configApp.data,
      })
    }
    return null
  }, [
    isAutopilotEnabled,
    autopilot.data,
    autopilot.error,
    contractSet.data,
    contractSet.error,
    uploadPacking.data,
    gouging.data,
    buildGougingData,
    redundancy.data,
    configApp.data,
    configApp.error,
  ])

  const revalidate = useCallback(async (): Promise<SettingsData | null> => {
    const autopilotData = isAutopilotEnabled
      ? await autopilot.mutate()
      : undefined
    const contractSetData = await contractSet.mutate()
    const _gougingData = await gouging.mutate()
    const redundancyData = await redundancy.mutate()
    const uploadPackingData = await uploadPacking.mutate()
    const configAppData = await configApp.mutate()
    if (!_gougingData || !redundancyData) {
      triggerErrorToast('Error fetching settings.')
      return null
    } else {
      const gougingData = buildGougingData(_gougingData)
      if (!gougingData) {
        return null
      }
      return transformDown({
        autopilotData,
        contractSetData,
        gougingData,
        redundancyData,
        uploadPackingData,
        configAppData,
      })
    }
  }, [
    isAutopilotEnabled,
    autopilot,
    contractSet,
    gouging,
    buildGougingData,
    uploadPacking,
    redundancy,
    configApp,
  ])

  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { revalidateAndResetFormData, changeCount } = useServerSyncedForm({
    form,
    remoteValues,
    revalidate,
    initialized: isUnlockedAndAuthedRoute,
    mode,
  })

  const renterdState = useBusState()
  const fields = useMemo(() => {
    const advancedDefaults = renterdState.data
      ? getAdvancedDefaults(renterdState.data.network)
      : undefined
    if (averages.data) {
      return getFields({
        advancedDefaults,
        isAutopilotEnabled,
        showAdvanced,
        redundancyMultiplier,
        includeRedundancyMaxStoragePrice,
        includeRedundancyMaxUploadPrice,
        storageAverage,
        uploadAverage,
        downloadAverage,
        contractAverage,
      })
    }
    return getFields({
      advancedDefaults,
      isAutopilotEnabled,
      showAdvanced,
      redundancyMultiplier,
      includeRedundancyMaxStoragePrice,
      includeRedundancyMaxUploadPrice,
    })
  }, [
    renterdState.data,
    isAutopilotEnabled,
    showAdvanced,
    averages.data,
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
    redundancyMultiplier,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
  ])

  const { canEstimate, estimatedSpendingPerMonth, estimatedSpendingPerTB } =
    useEstimates({
      isAutopilotEnabled,
      includeRedundancyMaxStoragePrice,
      includeRedundancyMaxUploadPrice,
      redundancyMultiplier,
      maxStoragePriceTBMonth,
      storageTB,
      maxDownloadPriceTB,
      downloadTBMonth,
      maxUploadPriceTB,
      uploadTBMonth,
    })

  const onValid = useOnValid({
    renterdState,
    estimatedSpendingPerMonth,
    showAdvanced,
    isAutopilotEnabled,
    autopilot,
    autopilotUpdate,
    revalidateAndResetFormData,
    syncDefaultContractSet,
    settingUpdate,
    contractSet,
    uploadPacking,
    redundancy,
    gouging,
    configApp,
  })

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

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
