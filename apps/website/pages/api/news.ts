import { minutesInSeconds } from '@siafoundation/units'
import { getNewsFeed } from '../../content/feed'

const maxAge = minutesInSeconds(5)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', `s-maxage=${maxAge}`)
  const filter = req.query.news
  const posts = await getNewsFeed(filter)
  res.status(200).json(posts)
}
