import { UseFormReturn } from 'react-hook-form'
import { InputValues } from './types'
import { useExchangeRate } from '@siafoundation/react-core'

export function useFormExchangeRate(form: UseFormReturn<InputValues>) {
  const pinnedCurrency = form.watch('pinnedCurrency')
  const { rate } = useExchangeRate({
    currency: pinnedCurrency || undefined,
  })
  return {
    rate,
    pinnedCurrency,
  }
}
