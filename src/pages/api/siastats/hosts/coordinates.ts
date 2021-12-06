import { getSiaStatsHostsCoordinates } from '../../../../lib/data/siaStats/hostsCoordinates'

export default async function handler(req, res) {
  const { status, data } = await getSiaStatsHostsCoordinates()
  res.status(status).json(data)
}
