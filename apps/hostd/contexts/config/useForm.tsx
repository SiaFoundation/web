import { useForm as useHookForm } from 'react-hook-form'
import { ConfigViewMode, defaultValues } from './types'
import { useEffect, useMemo, useRef } from 'react'
import { getFields } from './fields'
import useLocalStorageState from 'use-local-storage-state'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'
import { useStateHost } from '@siafoundation/hostd-react'
import { useAutoCalculatedFields } from './useAutoCalculatedFields'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues,
  })
  const storagePrice = form.watch('storagePrice')
  const collateralMultiplier = form.watch('collateralMultiplier')

  const [configViewMode, setConfigViewMode] =
    useLocalStorageState<ConfigViewMode>('v0/config/mode', {
      defaultValue: 'basic',
    })

  useAutoCalculatedFields({
    form,
  })

  const rates = useSiaCentralExchangeRates()
  const state = useStateHost()
  const pinningEnabled = state.data?.explorer.enabled
  // Field validation is only re-applied on re-mount,
  // so we pass a ref with latest data that can be used interally.
  const validationContext = useRef({
    pinningEnabled: pinningEnabled,
  })
  useEffect(() => {
    validationContext.current.pinningEnabled = pinningEnabled
  }, [pinningEnabled])
  const fields = useMemo(
    () =>
      getFields({
        pinningEnabled: state.data?.explorer.enabled,
        configViewMode,
        storageTBMonth: storagePrice,
        collateralMultiplier,
        rates: rates.data?.rates,
        validationContext: validationContext.current,
      }),
    [configViewMode, storagePrice, collateralMultiplier, rates.data, state.data]
  )

  return {
    form,
    fields,
    storageTBMonth: storagePrice,
    collateralMultiplier,
    configViewMode,
    setConfigViewMode,
  }
}
