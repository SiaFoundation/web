import { Heading } from '@siafoundation/design-system'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { appDomain } from '../../config/env'
import { getHref } from '../../lib/url'

function LearnWhitepaper() {
  return (
    <Layout>
      <Heading>Learn / Whitepaper</Heading>
      <PlaceholderBlock>
        <iframe
          height="1000px"
          width="100%"
          src={getHref(`${appDomain}/sia.pdf`)}
        />
      </PlaceholderBlock>
    </Layout>
  )
}

export default LearnWhitepaper
