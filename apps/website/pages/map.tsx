import { Map } from '../components/Map'
import { getExchangeRates } from '../content/exchangeRates'
import { getGeoHosts } from '../content/geoHosts'
import { getStats } from '../content/stats'
import { getMinutesInSeconds } from '../lib/time'
import type { AsyncReturnType } from '../lib/types'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function MapPage({ hosts, rates, stats }: Props) {
  return <Map hosts={hosts} rates={rates} stats={stats} />
}

export async function getStaticProps() {
  const [hosts, rates, stats] = await Promise.all([
    getGeoHosts(),
    getExchangeRates(),
    getStats(),
  ])

  const props = {
    hosts,
    rates: rates?.rates.sc,
    stats,
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
