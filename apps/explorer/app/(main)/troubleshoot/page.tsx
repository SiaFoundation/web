import { Metadata } from 'next'

import { TroubleshooterForm } from '../../../components/TroubleshooterForm'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'

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

export default function Page() {
  return <TroubleshooterForm />
}
