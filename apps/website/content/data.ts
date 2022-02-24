import {
  getBenchmarks,
  getCounts,
  getGithub,
  getSiaStatsHostsActive,
  getSiaStatsHostsCoordinates,
  getSiaStatsHostsStats,
  getSiaStatsStorage,
} from '@siafoundation/data-sources'

export async function getDataSourceProps() {
  const [
    hostsActive,
    hostsCoordinates,
    hostsStats,
    storage,
    downloadCounts,
    github,
    benchmarks,
  ] = await Promise.all([
    getSiaStatsHostsActive(),
    getSiaStatsHostsCoordinates(),
    getSiaStatsHostsStats(),
    getSiaStatsStorage(),
    getCounts(),
    getGithub(),
    getBenchmarks(),
  ])

  console.log([
    hostsActive,
    hostsStats,
    storage,
    downloadCounts,
    github,
    benchmarks,
  ])

  const mapData = geoJsonFormatter(hostsCoordinates.data)

  // Important to only pass minimum data required for rendering down to the client.
  const props = {
    hostsActive,
    hostsStats,
    storage,
    downloadCounts,
    github,
    benchmarks:
      benchmarks.status === 200
        ? {
            status: 200,
            data: benchmarks.data.slice(0, 4),
          }
        : benchmarks,
    mapDataFeatureCount: mapData.features.length,
  }

  return props
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
