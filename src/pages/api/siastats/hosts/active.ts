import { getSiaStatsHostsActive } from '../../../../lib/data/siaStats/hostsActive'

export default async function handler(req, res) {
  const { status, data } = await getSiaStatsHostsActive()
  res.status(status).json(data)
}
