import { getMinutesInSeconds } from '../../lib/time'
import { getCacheFeed } from '../../content/feed'

const maxAge = getMinutesInSeconds(5)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', `s-maxage=${maxAge}`)
  const filter = req.query.news
  const posts = await getCacheFeed(filter)
  res.status(200).json(posts)
}
