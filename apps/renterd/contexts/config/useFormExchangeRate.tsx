import { UseFormReturn, useWatch } from 'react-hook-form'
import { InputValues } from './types'
import { useDaemonExplorerExchangeRate } from '@siafoundation/design-system'

export function useFormExchangeRate(form: UseFormReturn<InputValues>) {
  const pinnedCurrency = useWatch({
    control: form.control,
    name: 'pinnedCurrency',
  })
  const { rate } = useDaemonExplorerExchangeRate({
    currency: pinnedCurrency || undefined,
  })
  return {
    rate,
    pinnedCurrency,
  }
}
