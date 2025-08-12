import { UseFormReturn } from 'react-hook-form'
import { InputValues } from './types'
import { useSiascanExchangeRate } from '@siafoundation/design-system'

export function useFormExchangeRate(form: UseFormReturn<InputValues>) {
  const pinnedCurrency = form.watch('pinnedCurrency')
  const { rate } = useSiascanExchangeRate({
    currency: pinnedCurrency || undefined,
  })
  return {
    rate,
    pinnedCurrency,
  }
}
