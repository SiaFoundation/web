import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import { ExplorerHost } from '@siafoundation/explored-types'
import { ContentLayout } from '../ContentLayout'
import { HostHeader } from './HostHeader'
import { HostSettings } from './HostSettings'
import { Panel, Text } from '@siafoundation/design-system'
import { formatDistance } from 'date-fns'

type Props = {
  host: ExplorerHost
  rates?: SiaCentralExchangeRates
}

export function Host({ host, rates }: Props) {
  return (
    <ContentLayout heading={<HostHeader host={host} rates={rates} />}>
      {host.settings ? (
        <HostSettings host={host} rates={rates} />
      ) : (
        <Panel className="p-4 flex items-center">
          <Text>
            Detailed information will be available once the host has been
            successfully scanned.
            {host.lastScan !== '0001-01-01T00:00:00Z' &&
              ` Last scan attempt was ${formatDistance(
                new Date(host.lastScan),
                new Date()
              )} ago.`}
          </Text>
        </Panel>
      )}
    </ContentLayout>
  )
}
