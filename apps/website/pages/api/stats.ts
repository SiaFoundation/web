import { getStats } from '../../content/stats'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400')
  res.status(200).json(await getStats())
}
