import { Link, Panel, Text } from '@siafoundation/design-system'
import { routes } from '../../config/routes'

export function PinnedCurrencyWarning({
  pinningEnabled,
  pinnedCurrency,
  forexEndpointURL,
}: {
  pinningEnabled: boolean
  pinnedCurrency: string
  forexEndpointURL: string
}) {
  return (
    <Panel className="px-2 pt-1 pb-2">
      <Text size="12" color="subtle">
        To pin this field:
      </Text>
      <div className="flex flex-col">
        {!pinningEnabled && (
          <Link size="12" href={routes.config.pinning} underline="hover">
            - Enable the pinning feature
          </Link>
        )}
        {!pinnedCurrency && (
          <Link size="12" href={routes.config.pinning} underline="hover">
            - Select a pinned currency
          </Link>
        )}
        {!forexEndpointURL && (
          <Link size="12" href={routes.config.pinning} underline="hover">
            - Enter a forex endpoint URL
          </Link>
        )}
      </div>
    </Panel>
  )
}
