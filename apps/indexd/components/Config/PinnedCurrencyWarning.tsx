import { Link, Panel, Text } from '@siafoundation/design-system'
import { routes } from '../../config/routes'

export function PinnedCurrencyWarning({
  canUseExchangeRates,
  pinnedCurrency,
}: {
  canUseExchangeRates: boolean
  pinnedCurrency: string
}) {
  return (
    <Panel className="px-2 pt-1 pb-2">
      <Text size="12" color="subtle">
        To pin this field:
      </Text>
      <div className="flex flex-col">
        {!canUseExchangeRates && !!pinnedCurrency && (
          <Link size="12" href={routes.config.pricing} underline="hover">
            - Enable an exchange rate API
          </Link>
        )}
        {!pinnedCurrency && (
          <Link size="12" href={routes.config.pricing} underline="hover">
            - Select a pinned currency
          </Link>
        )}
      </div>
    </Panel>
  )
}
