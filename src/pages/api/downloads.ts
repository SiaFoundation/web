import { getDownloadCounts } from '../../lib/data/downloads'

export default async function handler(req, res) {
  const { status, data } = await getDownloadCounts()
  res.status(status).json(data)
}
