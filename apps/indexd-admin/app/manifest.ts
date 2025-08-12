import { MetadataRoute } from 'next'

const title = 'indexd'
const description = 'Sia indexd daemon'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: title,
    short_name: title,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
  }
}
