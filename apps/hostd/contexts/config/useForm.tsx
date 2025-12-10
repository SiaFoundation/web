import { useForm as useHookForm, useWatch } from 'react-hook-form'
import { ConfigViewMode, defaultValues } from './types'
import { useEffect, useMemo, useRef } from 'react'
import { getFields } from './fields'
import useLocalStorageState from 'use-local-storage-state'
import { useHostState } from '@siafoundation/hostd-react'
import { useAutoCalculatedFields } from './useAutoCalculatedFields'
import { useDaemonExplorerExchangeRate } from '@siafoundation/design-system'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues,
  })
  const storagePrice = useWatch({ control: form.control, name: 'storagePrice' })
  const collateralMultiplier = useWatch({
    control: form.control,
    name: 'collateralMultiplier',
  })

  const [configViewMode, setConfigViewMode] =
    useLocalStorageState<ConfigViewMode>('v0/config/mode', {
      defaultValue: 'basic',
    })

  useAutoCalculatedFields({
    form,
  })

  const exchangeRateUSD = useDaemonExplorerExchangeRate({
    currency: 'usd',
  })
  const state = useHostState()
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
        exchangeRateUSD: exchangeRateUSD.rate,
        // eslint-disable-next-line react-hooks/refs
        validationContext: validationContext.current,
      }),
    [
      configViewMode,
      storagePrice,
      collateralMultiplier,
      exchangeRateUSD.rate,
      state.data,
    ],
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
