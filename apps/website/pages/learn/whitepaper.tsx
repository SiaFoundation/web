import { Heading } from '@siafoundation/design-system'
import { getHosts } from '@siafoundation/env'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { getHref } from '../../lib/url'

const hosts = getHosts()

function LearnWhitepaper() {
  return (
    <Layout>
      <Heading>Learn / Whitepaper</Heading>
      <PlaceholderBlock>
        <iframe
          height="1000px"
          width="100%"
          src={getHref(`${hosts.app}/sia.pdf`)}
        />
      </PlaceholderBlock>
    </Layout>
  )
}

export default LearnWhitepaper
