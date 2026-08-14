import { getGeoHosts } from '../../../components/Map/geoHosts'
import { getStats } from '../../../components/Map/stats'
import { getExploredInternalAddress } from '../../../lib/explored'
import { Map } from '../../../components/Map'

export default async function Page() {
  const exploredAddress = await getExploredInternalAddress()
  const [hosts, stats] = await Promise.all([
    getGeoHosts(exploredAddress),
    getStats(exploredAddress),
  ])

  return <Map hosts={hosts} stats={stats} />
}
