import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'

function LearnWhitepaper() {
  return (
    <Layout>
      <Heading>Learn / Whitepaper</Heading>
      <PlaceholderBlock>
        <iframe height="1000px" src="https://sia.tech/sia.pdf" />
      </PlaceholderBlock>
    </Layout>
  )
}

export default LearnWhitepaper
