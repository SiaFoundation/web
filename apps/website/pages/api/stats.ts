import { getStats } from '../../content/stats'

let stats = null

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400')
  if (!stats) {
    stats = await getStats()
  }
  res.status(200).json(stats)
}
