import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import { ContentLayout } from '../ContentLayout'
import { HostHeader } from './HostHeader'
import { HostSettings } from './HostSettings'

type Props = {
  host: SiaCentralHost
  rates?: SiaCentralExchangeRates
}

export function Host({ host, rates }: Props) {
  return (
    <ContentLayout heading={<HostHeader host={host} rates={rates} />}>
      <HostSettings host={host} rates={rates} />
    </ContentLayout>
  )
}
