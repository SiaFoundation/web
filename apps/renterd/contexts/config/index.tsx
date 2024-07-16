import {
  nodeToImage,
  triggerErrorToast,
  useFormChangeCount,
  useFormInit,
  useFormServerSynced,
  useOnInvalid,
} from '@siafoundation/design-system'
import type React from 'react'
import { createContext, useContext, useRef } from 'react'
import { useCallback, useMemo } from 'react'
import {
  checkIfAllResourcesLoaded,
  checkIfAnyResourcesErrored,
} from './resources'
import { transformDown } from './transformDown'
import type { SettingsData } from './types'
import { useForm } from './useForm'
import { useOnValid } from './useOnValid'
import { useResources } from './useResources'

export function useConfigMain() {
  const {
    autopilotState,
    autopilot,
    contractSet,
    gouging,
    redundancy,
    uploadPacking,
    averages,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    appSettings,
    isAutopilotEnabled,
  } = useResources()

  // resources required to intialize form
  const resources = useMemo(
    () => ({
      autopilotState: {
        data: autopilotState.data,
        error: autopilotState.error,
      },
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
      autopilotState.data,
      autopilotState.error,
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
      averages.data,
      averages.error,
      appSettings.settings.siaCentral,
    ],
  )

  const {
    form,
    storageTB,
    estimates,
    evaluation,
    redundancyMultiplier,
    fields,
    configViewMode,
    setConfigViewMode,
    allowanceDerivedPricing,
    setAllowanceDerivedPricing,
  } = useForm({ resources })

  const remoteValues: SettingsData | null = useMemo(() => {
    if (!checkIfAllResourcesLoaded(resources)) {
      return null
    }
    return transformDown({
      hasBeenConfigured: !!resources.autopilotState.data?.configured,
      autopilot: resources.autopilot.data,
      contractSet: resources.contractSet.data,
      uploadPacking: resources.uploadPacking.data!,
      gouging: resources.gouging.data!,
      averages: resources.averages.data,
      redundancy: resources.redundancy.data!,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources],
  )

  const revalidateAndResetForm = useCallback(async () => {
    // these do not seem to throw on errors, just return undefined
    const _autopilotState = await autopilotState.mutate()
    const _autopilot = isAutopilotEnabled ? await autopilot.mutate() : undefined
    const _contractSet = await contractSet.mutate()
    const _gouging = await gouging.mutate()
    const _redundancy = await redundancy.mutate()
    const _uploadPacking = await uploadPacking.mutate()
    if (!gouging || !redundancy) {
      triggerErrorToast({ title: 'Error fetching settings' })
      return
    }
    form.reset(
      transformDown({
        hasBeenConfigured: _autopilotState!.configured,
        autopilot: _autopilot,
        contractSet: _contractSet,
        uploadPacking: _uploadPacking!,
        gouging: _gouging!,
        averages: averages.data,
        redundancy: _redundancy!,
      }),
    )
  }, [
    form,
    autopilotState,
    isAutopilotEnabled,
    autopilot,
    contractSet,
    gouging,
    uploadPacking,
    redundancy,
    averages.data,
  ])

  useFormInit<SettingsData>({
    form,
    remoteValues,
  })
  useFormServerSynced<SettingsData>({
    form,
    remoteValues,
  })
  const { changeCount } = useFormChangeCount({ form })

  const onValid = useOnValid({
    resources,
    estimatedSpendingPerMonth: estimates.estimatedSpendingPerMonth!,
    isAutopilotEnabled,
    revalidateAndResetForm,
  })

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid],
  )

  const configRef = useRef<HTMLDivElement>(null)
  const takeScreenshot = useCallback(
    async (props: {
      name: string
      quality?: number
      copy?: boolean
      download?: boolean
    }) => {
      if (configRef.current) {
        nodeToImage(configRef.current, props)
      }
    },
    [],
  )

  return {
    onSubmit,
    revalidateAndResetForm,
    form,
    fields,
    changeCount,
    estimates,
    redundancyMultiplier,
    storageTB,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    configViewMode,
    setConfigViewMode,
    remoteError,
    configRef,
    takeScreenshot,
    evaluation,
    allowanceDerivedPricing,
    setAllowanceDerivedPricing,
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
