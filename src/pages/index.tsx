import { Layout } from '../components/Layout'
import { getDownloadCounts } from '../lib/data/downloads'
import { getGithub } from '../lib/data/github'
// import { getSiaStatsHostsActive } from '../lib/data/siaStats/hostsActive'
import { getSiaStatsHostsCoordinates } from '../lib/data/siaStats/hostsCoordinates'
import { getSiaStatsHostsStats } from '../lib/data/siaStats/hostsStats'
import { getSiaStatsStorage } from '../lib/data/siaStats/storage'
import { getDaysInSeconds } from '../lib/time'
import { Text } from '../system/Text'

export default function Home({
  storage,
  hostsStats,
  mapDataFeatureCount,
  github,
  downloadCounts,
}) {
  return (
    <Layout>
      <Text>hosts stats: {JSON.stringify(hostsStats)}</Text>
      <Text>storage: {JSON.stringify(storage)}</Text>
      <Text>map data: {mapDataFeatureCount} features</Text>
      <Text>github: {JSON.stringify(github)}</Text>
      <Text>downloads: {JSON.stringify(downloadCounts)}</Text>
    </Layout>
  )
}

// The following function runs at build-time to generate static files to serve.
// After run-time, the static files will be recomputed on the `revalidate`
// interval, without blocking any request.
export async function getStaticProps() {
  const [
    // hostsActive,
    hostsCoordinates,
    hostsStats,
    storage,
    downloadCounts,
    github,
  ] = await Promise.all([
    // getSiaStatsHostsActive(),
    getSiaStatsHostsCoordinates(),
    getSiaStatsHostsStats(),
    getSiaStatsStorage(),
    getDownloadCounts(),
    getGithub(),
  ])

  console.log([
    // hostsActive,
    // hostsCoordinates,
    hostsStats,
    storage,
    downloadCounts,
    github,
  ])

  const mapData = geoJsonFormatter(hostsCoordinates.data)

  const props = {
    hostsStats,
    storage,
    downloadCounts,
    github,
    mapDataFeatureCount: mapData.features.length,
  }

  return {
    props,
    revalidate: getDaysInSeconds(1),
  }
}

function geoJsonFormatter(hostsCoordinates) {
  const geoJson = {
    type: 'FeatureCollection',
    features: [] as any[],
  }
  hostsCoordinates.forEach((h) => {
    geoJson.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [h.lon, h.lat],
      },
    })
  })
  return geoJson
}
