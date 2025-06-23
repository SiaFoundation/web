import { getOGImage } from '../../../components/OGImage'

export const alt = 'Faucet'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return getOGImage(
    {
      title: 'Host revenue calculator',
      subtitle:
        'Calculator for modeling revenue based on storage cost, usage, pricing, and collateral.',
    },
    size
  )
}
