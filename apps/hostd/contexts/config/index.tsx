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
  checkIfAllResourcesLoaded,
  checkIfAnyResourcesErrored,
} from './resources'
import { useOnValid } from './useOnValid'

export function useConfigMain() {
  const { settings, dynDNSCheck } = useResources()

  const { form, fields, setShowAdvanced, showAdvanced } = useForm()

  // resources required to intialize form
  const resources = useMemo(
    () => ({
      settings: {
        data: settings.data,
        error: settings.error,
      },
    }),
    [settings.data, settings.error]
  )

  const remoteValues = useMemo(() => {
    if (!checkIfAllResourcesLoaded(resources)) {
      return null
    }
    return transformDown({
      settings: resources.settings.data,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources]
  )

  const revalidateAndResetForm = useCallback(async () => {
    const _settings = await settings.mutate()
    if (!_settings) {
      triggerErrorToast('Error fetching settings.')
    } else {
      // also recheck dynamic dns
      await dynDNSCheck.mutate()
      return form.reset(
        transformDown({
          settings: _settings,
        })
      )
    }
  }, [form, settings, dynDNSCheck])

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
    dirtyFields: form.formState.dirtyFields,
    showAdvanced,
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
    showAdvanced,
    setShowAdvanced,
    remoteError,
    takeScreenshot,
    configRef,
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
