import { getOGImage } from '../../../components/OGImage'

export const alt = 'Troubleshooter'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return getOGImage(
    {
      title: 'Host Troubleshooter',
      subtitle: 'Scans hosts for potential issues.',
    },
    size,
  )
}
