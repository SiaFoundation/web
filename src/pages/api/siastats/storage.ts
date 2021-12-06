import { getSiaStatsStorage } from '../../../lib/data/siaStats/storage'

export default async function handler(req, res) {
  const { status, data } = await getSiaStatsStorage()
  res.status(status).json(data)
}
