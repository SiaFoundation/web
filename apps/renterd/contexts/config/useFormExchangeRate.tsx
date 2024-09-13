import { UseFormReturn } from 'react-hook-form'
import { SettingsData } from './types'
import { useExchangeRate } from '@siafoundation/react-core'

export function useFormExchangeRate(form: UseFormReturn<SettingsData>) {
  const pinnedCurrency = form.watch('pinnedCurrency')
  const { rate } = useExchangeRate({
    currency: pinnedCurrency || undefined,
  })
  return {
    rate,
    pinnedCurrency,
  }
}
