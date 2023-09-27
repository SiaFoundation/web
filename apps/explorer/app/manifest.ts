import { MetadataRoute } from 'next'
import { network } from '../config'

const title = 'siascan'
const description =
  network === 'mainnet'
    ? 'Sia blockchain and host explorer.'
    : 'Zen blockchain and host explorer.'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: title,
    short_name: title,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
    ],
  }
}
