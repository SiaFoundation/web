import { Code, Link, Text } from '@siafoundation/design-system'
import { getCounts } from '@web/counter'
import { PlaceholderBlock } from '../components/PlaceholderBlock'
import { Layout } from '../components/Layout'
import { sitemap } from '../config/site'
import { getGithub } from '../lib/data/github'
import { getSiaStatsHostsActive } from '../lib/data/siaStats/hostsActive'
import { getSiaStatsHostsCoordinates } from '../lib/data/siaStats/hostsCoordinates'
import { getSiaStatsHostsStats } from '../lib/data/siaStats/hostsStats'
import { getSiaStatsStorage } from '../lib/data/siaStats/storage'
import { getDaysInSeconds } from '../lib/time'

export default function Home({
  storage,
  hostsActive,
  hostsStats,
  mapDataFeatureCount,
  github,
  downloadCounts,
}) {
  return (
    <Layout>
      <PlaceholderBlock title="Hero + headline">
        <Link href={sitemap.developers.index}>Download</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Stats / validation">
        <Text>hosts active:</Text>
        <pre>
          <Code>{JSON.stringify(hostsActive, null, 2)}</Code>
        </pre>
        <Text>hosts stats:</Text>
        <pre>
          <Code>{JSON.stringify(hostsStats, null, 2)}</Code>
        </pre>
        <Text>storage:</Text>
        <pre>
          <Code>{JSON.stringify(storage, null, 2)}</Code>
        </pre>
        <Text>map data:</Text>
        <pre>
          <Code>{mapDataFeatureCount} features</Code>
        </pre>
        <Text>github:</Text>
        <pre>
          <Code>{JSON.stringify(github, null, 2)}</Code>
        </pre>
        <Text>downloads:</Text>
        <pre>
          <Code>{JSON.stringify(downloadCounts, null, 2)}</Code>
        </pre>
      </PlaceholderBlock>
      <PlaceholderBlock title="Ecosystem / in use"></PlaceholderBlock>
      <PlaceholderBlock title="Get Started / beginner tutorials"></PlaceholderBlock>
      <PlaceholderBlock title="Blog posts or tweets"></PlaceholderBlock>
      <PlaceholderBlock title="Developers / resources"></PlaceholderBlock>
    </Layout>
  )
}

// The following function runs at build-time to generate static files to serve.
// After run-time, the static files will be recomputed on the `revalidate`
// interval, without blocking any request.
export async function getStaticProps() {
  const [
    hostsActive,
    hostsCoordinates,
    hostsStats,
    storage,
    downloadCounts,
    github,
  ] = await Promise.all([
    getSiaStatsHostsActive(),
    getSiaStatsHostsCoordinates(),
    getSiaStatsHostsStats(),
    getSiaStatsStorage(),
    getCounts(),
    getGithub(),
  ])

  console.log([hostsActive, hostsStats, storage, downloadCounts, github])

  const mapData = geoJsonFormatter(hostsCoordinates.data)

  const props = {
    hostsActive,
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

type Feature = {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}

function geoJsonFormatter(hostsCoordinates) {
  const geoJson = {
    type: 'FeatureCollection',
    features: [] as Feature[],
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
