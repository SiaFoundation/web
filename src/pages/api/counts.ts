import { getCounts } from '../../lib/data/counts'

export default async function handler(req, res) {
  const { status, data } = await getCounts()
  res.status(status).json(data)
}
