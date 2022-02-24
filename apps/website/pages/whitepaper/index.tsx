import { Heading } from '@siafoundation/design-system'
import { getHosts } from '@siafoundation/env'
import { SimpleBlock } from '../../components/SimpleBlock'
import { Layout } from '../../components/Layout'
import { getHref } from '../../lib/url'

const hosts = getHosts()

function Whitepaper() {
  return (
    <Layout>
      <Heading>Whitepaper</Heading>
      <SimpleBlock>
        <iframe
          height="1000px"
          width="100%"
          src={getHref(`${hosts.app}/sia.pdf`)}
        />
      </SimpleBlock>
    </Layout>
  )
}

export default Whitepaper
