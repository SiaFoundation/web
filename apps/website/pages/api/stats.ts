import { minutesInSeconds } from '@siafoundation/units'
import { getStats } from '../../content/stats'

const maxAge = minutesInSeconds(5)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', `s-maxage=${maxAge}`)
  const stats = await getStats()
  res.status(200).json(stats)
}
