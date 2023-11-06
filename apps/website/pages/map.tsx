import { AsyncReturnType } from '../lib/types'
import { getGeoHosts } from '../content/geoHosts'
import { getExchangeRates } from '../content/exchangeRates'
import { getMinutesInSeconds } from '../lib/time'
import { Map } from '../components/Map'
import { getStats } from '../content/stats'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function MapPage({ hosts, rates, stats }: Props) {
  return <Map hosts={hosts} rates={rates} stats={stats} />
}

export async function getStaticProps() {
  const [hosts, { data: rates }, stats] = await Promise.all([
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
