import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { Container, Heading } from '@siafoundation/design-system'

export function generateMetadata(): Metadata {
  const title = 'Host revenue calculator'
  const description =
    'Calculator for modeling revenue based on storage cost, usage, pricing, and collateral.'
  const url = routes.hostRevenueCalculator.index
  return buildMetadata({
    title,
    description,
    url,
  })
}

export default function Page() {
  return (
    <Container>
      <div className="flex flex-col gap-3">
        <Heading>Host Revenue Calculator</Heading>
        <iframe
          src="https://bafybeiguvt6gevjdyxmruhetnbryyqqdnvwqnwuu3bobjuh35vg4trgvwm.ipfs.fsd.link"
          width="100%"
          height="1000px"
        />
      </div>
    </Container>
  )
}
