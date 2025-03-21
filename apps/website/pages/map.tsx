import { AsyncReturnType } from '../lib/types'
import { getGeoHosts } from '../content/geoHosts'
import { minutesInSeconds } from '@siafoundation/units'
import { Map } from '../components/Map'
import { getStats } from '../content/stats'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function MapPage({ hosts, stats }: Props) {
  return <Map hosts={hosts} stats={stats} />
}

export async function getStaticProps() {
  const [hosts, stats] = await Promise.all([getGeoHosts(), getStats()])

  const props = {
    hosts,
    stats,
  }

  return {
    props,
    revalidate: minutesInSeconds(5),
  }
}
