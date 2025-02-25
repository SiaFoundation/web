import { UseFormReturn } from 'react-hook-form'
import { InputValues } from './types'
import { useExchangeRate } from '@siafoundation/design-system'

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
