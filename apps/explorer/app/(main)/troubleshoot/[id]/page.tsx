import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { to } from '@siafoundation/request'

import {
  TroubleshooterRateLimit,
  TroubleshooterResults,
} from '../../../../components/TroubleshooterResults'

import { network } from '../../../../config'
import { routes } from '../../../../config/routes'
import { getExplored } from '../../../../lib/explored'
import { ExplorerPageProps } from '../../../../lib/pageProps'
import {
  getTroubleshooterData,
  TroubleshooterResponse,
} from '../../../../lib/troubleshooter'
import { buildMetadata } from '../../../../lib/utils'

export function generateMetadata(): Metadata {
  const title = 'Host Troubleshooter'
  const description =
    'Troubleshooter for checking host connectivity and configuration.'
  const url = routes.troubleshoot.index
  return buildMetadata({
    title,
    description,
    url,
  })
}

export default async function Page({ params }: ExplorerPageProps) {
  const p = await params
  const id = p?.id
  const explored = await getExplored()

  const [host, hostError, hostResponse] = await to(
    explored.hostByPubkey({ params: { id } }),
  )

  if (hostError) {
    if (hostResponse?.status === 404) return notFound()
    throw hostError
  }

  const [tsResults, , tsResultsResponse] = await to<TroubleshooterResponse>(
    getTroubleshooterData({
      network,
      request: {
        publicKey: host.publicKey,
        rhp4NetAddresses: 'v2NetAddresses' in host ? host.v2NetAddresses : [],
      },
    }),
  )

  if (
    typeof tsResultsResponse?.data === 'string' &&
    (tsResultsResponse?.data as string).includes('host is on cooldown')
  ) {
    return <TroubleshooterRateLimit message={tsResultsResponse?.data} />
  }

  if (!tsResults) throw new Error('Troubleshooter API request failed.')

  return <TroubleshooterResults troubleshooterData={tsResults} />
}
