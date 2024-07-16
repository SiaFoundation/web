import type { MetadataRoute } from 'next'
import { network } from '../config'

const title = 'siascan'
const description =
  network === 'mainnet'
    ? 'Siascan is a block explorer with host statistics and pricing details. Siascan is built for Sia, a decentralized storage network.'
    : 'Siascan Zen is a block explorer with host statistics and pricing details. Siascan Zen is built for the Sia Zen Testnet.'

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
