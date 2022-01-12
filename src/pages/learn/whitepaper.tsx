import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'
import { appDomain } from '../../config/env'
import { getUrl } from '../../lib/url'

function LearnWhitepaper() {
  return (
    <Layout>
      <Heading>Learn / Whitepaper</Heading>
      <PlaceholderBlock>
        <iframe height="1000px" src={getUrl(`${appDomain}/sia.pdf`)} />
      </PlaceholderBlock>
    </Layout>
  )
}

export default LearnWhitepaper
