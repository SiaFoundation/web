import React, { useRef, createContext, useContext } from 'react'
import {
  nodeToImage,
  triggerErrorToast,
  useFormChangeCount,
  useFormInit,
  useFormServerSynced,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { SettingsData } from './types'
import { transformDown } from './transform'
import { useResources } from './useResources'
import { useOnValid } from './useOnValid'
import { useEstimates } from './useEstimates'
import { useForm } from './useForm'
import {
  checkIfAllResourcesLoaded,
  checkIfAnyResourcesErrored,
} from './resources'

export function useConfigMain() {
  const {
    autopilot,
    contractSet,
    display,
    gouging,
    redundancy,
    uploadPacking,
    averages,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    appSettings,
    isAutopilotEnabled,
  } = useResources()

  const {
    form,
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
    redundancyMultiplier,
    fields,
    showAdvanced,
    setShowAdvanced,
  } = useForm()

  // resources required to intialize form
  const resources = useMemo(
    () => ({
      autopilot: {
        data: autopilot.data,
        error: autopilot.error,
      },
      contractSet: {
        data: contractSet.data,
        error: contractSet.error,
      },
      uploadPacking: {
        data: uploadPacking.data,
        error: uploadPacking.error,
      },
      gouging: {
        data: gouging.data,
        error: gouging.error,
      },
      redundancy: {
        data: redundancy.data,
        error: redundancy.error,
      },
      display: {
        data: display.data,
        error: display.error,
      },
      averages: {
        data: averages.data,
        error: averages.error,
      },
      appSettings: {
        settings: {
          siaCentral: appSettings.settings.siaCentral,
        },
      },
    }),
    [
      autopilot.data,
      autopilot.error,
      contractSet.data,
      contractSet.error,
      uploadPacking.data,
      uploadPacking.error,
      gouging.data,
      gouging.error,
      redundancy.data,
      redundancy.error,
      display.data,
      display.error,
      averages.data,
      averages.error,
      appSettings.settings.siaCentral,
    ]
  )

  const remoteValues: SettingsData = useMemo(() => {
    if (!checkIfAllResourcesLoaded(resources)) {
      return null
    }
    return transformDown({
      autopilot: resources.autopilot.data,
      contractSet: resources.contractSet.data,
      uploadPacking: resources.uploadPacking.data,
      gouging: resources.gouging.data,
      averages: resources.averages.data,
      redundancy: resources.redundancy.data,
      display: resources.display.data,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources]
  )

  const revalidateAndResetForm = useCallback(async () => {
    // these do not seem to throw on errors, just return undefined
    const _autopilot = isAutopilotEnabled ? await autopilot.mutate() : undefined
    const _contractSet = await contractSet.mutate()
    const _gouging = await gouging.mutate()
    const _redundancy = await redundancy.mutate()
    const _uploadPacking = await uploadPacking.mutate()
    const _display = await display.mutate()
    if (!gouging || !redundancy) {
      triggerErrorToast('Error fetching settings.')
      return null
    }
    form.reset(
      transformDown({
        autopilot: _autopilot,
        contractSet: _contractSet,
        uploadPacking: _uploadPacking,
        gouging: _gouging,
        averages: averages.data,
        redundancy: _redundancy,
        display: _display,
      })
    )
  }, [
    form,
    isAutopilotEnabled,
    autopilot,
    contractSet,
    gouging,
    uploadPacking,
    redundancy,
    display,
    averages.data,
  ])

  useFormInit({
    form,
    remoteValues,
  })
  useFormServerSynced({
    form,
    remoteValues,
  })
  const { changeCount } = useFormChangeCount({ form })

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
    resources,
    estimatedSpendingPerMonth,
    showAdvanced,
    isAutopilotEnabled,
    revalidateAndResetForm,
  })

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const configRef = useRef()
  const takeScreenshot = useCallback(
    async (props: {
      name: string
      quality?: number
      copy?: boolean
      download?: boolean
    }) => {
      nodeToImage(configRef.current, props)
    },
    []
  )

  return {
    onSubmit,
    revalidateAndResetForm,
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
    remoteError,
    configRef,
    takeScreenshot,
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
