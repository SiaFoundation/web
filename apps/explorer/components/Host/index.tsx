import { Panel, Text } from '@siafoundation/design-system'
import type {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central-types'
import { formatDistance } from 'date-fns'
import { ContentLayout } from '../ContentLayout'
import { HostHeader } from './HostHeader'
import { HostSettings } from './HostSettings'
import type { SiaCentralHostScanned } from './types'

type Props = {
  host: SiaCentralHost
  rates?: SiaCentralExchangeRates
}

export function Host({ host, rates }: Props) {
  return (
    <ContentLayout heading={<HostHeader host={host} rates={rates} />}>
      {host.settings ? (
        <HostSettings host={host as SiaCentralHostScanned} rates={rates} />
      ) : (
        <Panel className="p-4 flex items-center">
          <Text>
            Detailed information will be available once the host has been
            successfully scanned.
            {host.last_scan !== '0001-01-01T00:00:00Z' &&
              ` Last scan attempt was ${formatDistance(
                new Date(host.last_scan),
                new Date(),
              )} ago.`}
          </Text>
        </Panel>
      )}
    </ContentLayout>
  )
}
