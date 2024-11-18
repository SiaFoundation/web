import { Metadata } from 'next'
import { appLink } from '../config'
import { Home } from '../components/Home'
import { buildMetadata } from '../lib/utils'

export function generateMetadata(): Metadata {
  const title = 'siascan'
  const description = 'Compare data storage services'
  return buildMetadata({
    title,
    description,
    url: appLink,
  })
}

export const revalidate = 0

export default async function HomePage() {
  return <Home />
}
