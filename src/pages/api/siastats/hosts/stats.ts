import { getSiaStatsHostsStats } from '../../../../lib/data/siaStats/hostsStats'

export default async function handler(req, res) {
  const { status, data } = await getSiaStatsHostsStats()
  res.status(status).json(data)
}
