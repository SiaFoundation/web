import { getGeoHosts } from '../../../components/Map/geoHosts'
import { getStats } from '../../../components/Map/stats'
import { getExploredAddress } from '../../../lib/explored'
import { Map } from '../../../components/Map'

export default async function Page() {
  const exploredAddress = await getExploredAddress()
  const [hosts, stats] = await Promise.all([
    getGeoHosts(exploredAddress),
    getStats(exploredAddress),
  ])

  return <Map hosts={hosts} stats={stats} />
}
