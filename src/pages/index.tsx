import Link from 'next/link'
import { Block } from '../components/Block'
import { Layout } from '../components/Layout'
import { sitemap } from '../config/site'
import { getCounts } from '../lib/data/counts'
import { getGithub } from '../lib/data/github'
// import { getSiaStatsHostsActive } from '../lib/data/siaStats/hostsActive'
import { getSiaStatsHostsCoordinates } from '../lib/data/siaStats/hostsCoordinates'
import { getSiaStatsHostsStats } from '../lib/data/siaStats/hostsStats'
import { getSiaStatsStorage } from '../lib/data/siaStats/storage'
import { getDaysInSeconds } from '../lib/time'
import { Code } from '../system/Code'
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
      <Block title="Hero + headline">
        <Link href={sitemap.developers.index}>Download</Link>
      </Block>
      <Block title="Stats / validation">
        <Text>hosts stats:</Text>
        <pre>
          <Code>{JSON.stringify(hostsStats, null, 1)}</Code>
        </pre>
        <Text>storage:</Text>
        <pre>
          <Code>{JSON.stringify(storage, null, 1)}</Code>
        </pre>
        <Text>map data:</Text>
        <pre>
          <Code>{mapDataFeatureCount} features</Code>
        </pre>
        <Text>github:</Text>
        <pre>
          <Code>{JSON.stringify(github, null, 1)}</Code>
        </pre>
        <Text>downloads:</Text>
        <pre>
          <Code>{JSON.stringify(downloadCounts, null, 1)}</Code>
        </pre>
      </Block>
      <Block title="Ecosystem / in use"></Block>
      <Block title="Get Started / beginner tutorials"></Block>
      <Block title="Blog posts or tweets"></Block>
      <Block title="Developers / resources"></Block>
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
    getCounts(),
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
