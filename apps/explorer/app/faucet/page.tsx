import { Metadata } from 'next'
import { Faucet } from '../../components/Faucet'
import { routes } from '../../config/routes'
import { buildMetadata } from '../../lib/utils'

export function generateMetadata(): Metadata {
  const title = 'Faucet'
  const description = 'Sia testnet faucet'
  const url = routes.faucet.index
  return buildMetadata({
    title,
    description,
    url,
  })
}

export default function Page() {
  return <Faucet />
}
