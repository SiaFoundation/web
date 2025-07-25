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
import { InputValues } from './types'
import { transformDown } from './transformDown'
import { useOnValid } from './useOnValid'
import { useForm } from './useForm'
import {
  useResources,
  checkIfAllResourcesLoaded,
  checkIfAnyResourcesErrored,
} from './useResources'

export function useConfigMain() {
  const { autopilotState, autopilot, gouging, pinned, upload, resources } =
    useResources()

  const {
    form,
    storageTB,
    evaluation,
    redundancyMultiplier,
    fields,
    configViewMode,
    setConfigViewMode,
  } = useForm({ resources })

  const remoteValues: InputValues | undefined = useMemo(() => {
    const loaded = checkIfAllResourcesLoaded(resources)
    if (!loaded) {
      return undefined
    }
    return transformDown({
      autopilot: loaded.autopilot.data,
      gouging: loaded.gouging.data,
      pinned: loaded.pinned.data,
      upload: loaded.upload.data,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources]
  )

  const revalidateAndResetForm = useCallback(async () => {
    // these do not seem to throw on errors, just return undefined
    const _autopilotState = await autopilotState.mutate()
    const _autopilot = await autopilot.mutate()
    const _gouging = await gouging.mutate()
    const _pinned = await pinned.mutate()
    const _upload = await upload.mutate()
    if (!_autopilotState || !_autopilot || !_gouging || !_upload || !_pinned) {
      triggerErrorToast({ title: 'Error fetching settings' })
      return undefined
    }
    form.reset(
      transformDown({
        autopilot: _autopilot,
        gouging: _gouging,
        pinned: _pinned,
        upload: _upload,
      })
    )
  }, [form, autopilotState, autopilot, gouging, pinned, upload])

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
    revalidateAndResetForm,
  })

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const configRef = useRef<HTMLDivElement>(null)
  const takeScreenshot = useCallback(
    async (props: {
      name: string
      quality?: number
      copy?: boolean
      download?: boolean
    }) => {
      if (!configRef.current) {
        return
      }
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
