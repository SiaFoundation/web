import { getFeed } from '../../content/feed'

const cache = {}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400')
  const filter = req.query.news
  let posts = cache[filter]
  if (!posts) {
    posts = await getFeed(filter)
  }
  res.status(200).json(posts)
}
