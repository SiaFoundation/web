'use client'

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
  const { hosts, contracts, pricePinning, resources } = useResources()

  const { form, fields } = useForm()

  const remoteValues: InputValues | undefined = useMemo(() => {
    const loaded = checkIfAllResourcesLoaded(resources)
    if (!loaded) {
      return undefined
    }
    return transformDown({
      hosts: loaded.hosts.data,
      contracts: loaded.contracts.data,
      pricePinning: loaded.pricePinning.data,
    })
  }, [resources])

  const remoteError = useMemo(
    () => checkIfAnyResourcesErrored(resources),
    [resources],
  )

  const revalidateAndResetForm = useCallback(async () => {
    // these do not seem to throw on errors, just return undefined
    const _hosts = await hosts.mutate()
    const _contracts = await contracts.mutate()
    const _pricePinning = await pricePinning.mutate()
    if (!_hosts || !_contracts || !_pricePinning) {
      triggerErrorToast({ title: 'Error fetching settings' })
      return undefined
    }
    form.reset(
      transformDown({
        hosts: _hosts,
        contracts: _contracts,
        pricePinning: _pricePinning,
      }),
    )
  }, [form, hosts, contracts, pricePinning])

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
      if (!configRef.current) {
        return
      }
      nodeToImage(configRef.current, props)
    },
    [],
  )

  return {
    onSubmit,
    revalidateAndResetForm,
    form,
    fields,
    changeCount,
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
