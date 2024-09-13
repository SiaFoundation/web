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
import { transformDown } from './transformDown'
import { useResources } from './useResources'
import { useOnValid } from './useOnValid'
import { useForm } from './useForm'
import {
  checkIfAllResourcesLoaded,
  checkIfAnyResourcesErrored,
} from './resources'
import { useApp } from '../app'

export function useConfigMain() {
  const {
    autopilotState,
    autopilot,
    gouging,
    pinned,
    upload,
    averages,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    appSettings,
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
      gouging: {
        data: gouging.data,
        error: gouging.error,
      },
      pinned: {
        data: pinned.data,
        error: pinned.error,
      },
      upload: {
        data: upload.data,
        error: upload.error,
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
      gouging.data,
      gouging.error,
      pinned.data,
      pinned.error,
      upload.data,
      upload.error,
      averages.data,
      averages.error,
      appSettings.settings.siaCentral,
    ]
  )

  const {
    form,
    storageTB,
    evaluation,
    redundancyMultiplier,
    fields,
    configViewMode,
    setConfigViewMode,
  } = useForm({ resources })

  const remoteValues: SettingsData = useMemo(() => {
    if (!checkIfAllResourcesLoaded(resources)) {
      return null
    }
    return transformDown({
      autopilotID: resources.autopilotState.data?.id,
      hasBeenConfigured: resources.autopilotState.data?.configured,
      autopilot: resources.autopilot.data,
      gouging: resources.gouging.data,
      pinned: resources.pinned.data,
      upload: resources.upload.data,
      averages: resources.averages.data,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources]
  )

  const { isAutopilotEnabled } = useApp()
  const revalidateAndResetForm = useCallback(async () => {
    // these do not seem to throw on errors, just return undefined
    const _autopilotState = await autopilotState.mutate()
    const _autopilot = isAutopilotEnabled ? await autopilot.mutate() : undefined
    const _gouging = await gouging.mutate()
    const _pinned = await pinned.mutate()
    const _upload = await upload.mutate()
    if (!_autopilotState || !_gouging || !_upload || !_pinned) {
      triggerErrorToast({ title: 'Error fetching settings' })
      return null
    }
    form.reset(
      transformDown({
        autopilotID: _autopilotState.id,
        hasBeenConfigured: _autopilotState.configured,
        autopilot: _autopilot,
        gouging: _gouging,
        pinned: _pinned,
        upload: _upload,
        averages: averages.data,
      })
    )
  }, [
    form,
    autopilotState,
    isAutopilotEnabled,
    autopilot,
    gouging,
    pinned,
    upload,
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

  const onValid = useOnValid({
    resources,
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
