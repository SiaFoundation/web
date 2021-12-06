import { getGithub } from '../../lib/data/github'

export default async function handler(req, res) {
  const { status, data } = await getGithub()
  res.status(status).json(data)
}
