import { getOGImage } from '../components/OGImage'

export const revalidate = 0

export const alt = 'Storage comparison'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return getOGImage(
    {
      title: 'siascan',
      subtitle: 'Compare',
    },
    size
  )
}
