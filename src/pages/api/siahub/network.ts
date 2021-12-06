import { getSiahubNetwork } from '../../../lib/data/siaHub/network'

// NOTE: The siahub website is no longer online.
export default async function handler(req, res) {
  const { status, data } = await getSiahubNetwork()
  res.status(status).json(data)
}
