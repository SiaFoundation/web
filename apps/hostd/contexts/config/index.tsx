import { createContext, useContext, useRef } from 'react'
import {
  triggerErrorToast,
  useOnInvalid,
  useFormInit,
  useFormServerSynced,
  useFormChangeCount,
  nodeToImage,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { transformDown } from './transform'
import { useResources } from './useResources'
import { useForm } from './useForm'
import {
  Resources,
  checkIfAllResourcesLoaded,
  checkIfAnyResourcesErrored,
} from './resources'
import { useOnValid } from './useOnValid'
import { useStateHost } from '@siafoundation/hostd-react'

export function useConfigMain() {
  const { settings, settingsPinned, dynDNSCheck } = useResources()

  const { form, fields, configViewMode, setConfigViewMode } = useForm()

  // Resources required to intialize form.
  const resources: Resources = useMemo(
    () => ({
      settings: {
        data: settings.data,
        error: settings.error,
      },
      settingsPinned: {
        data: settingsPinned.data,
        error: settingsPinned.error,
      },
    }),
    [settings.data, settings.error, settingsPinned.data, settingsPinned.error]
  )

  const remoteValues = useMemo(() => {
    if (!checkIfAllResourcesLoaded(resources)) {
      return null
    }
    return transformDown({
      settings: resources.settings.data,
      settingsPinned: resources.settingsPinned.data,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources]
  )

  const state = useStateHost()
  const pinningEnabled = state.data?.explorer.enabled
  const revalidateAndResetForm = useCallback(async () => {
    const _settings = await settings.mutate()
    const _settingsPinned = await settingsPinned.mutate()
    if (!_settings || (pinningEnabled && !_settingsPinned)) {
      triggerErrorToast({ title: 'Error fetching settings' })
    } else {
      // Also recheck dynamic DNS.
      await dynDNSCheck.mutate()
      return form.reset(
        transformDown({
          settings: _settings,
          settingsPinned: _settingsPinned,
        })
      )
    }
  }, [form, settings, settingsPinned, dynDNSCheck, pinningEnabled])

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
    fields,
    settings,
    dynDNSCheck,
    changeCount,
    revalidateAndResetForm,
    form,
    onSubmit,
    setConfigViewMode,
    configViewMode,
    remoteError,
    takeScreenshot,
    configRef,
    pinningEnabled,
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
