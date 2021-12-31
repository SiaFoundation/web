import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'

function LearnWhitepaper() {
  return (
    <Layout>
      <Heading>Learn / Whitepaper</Heading>
      <Block>
        <iframe height="1000px" src="https://sia.tech/sia.pdf" />
      </Block>
    </Layout>
  )
}

export default LearnWhitepaper
