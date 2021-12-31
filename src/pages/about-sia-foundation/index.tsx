import Link from 'next/link'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { sitemap, social } from '../../config/site'
import { Heading } from '../../system/Heading'

function Foundation() {
  return (
    <Layout>
      <Heading>About the Sia Foundation</Heading>
      <Block title="Vision"></Block>
      <Block title="Team grid"></Block>
      <Block title="Quarterly reports"></Block>
      <Block title="Recent news">
        <Link href={sitemap.newsroom.index}>News</Link>
      </Block>
      <Block title="Contact form"></Block>
    </Layout>
  )
}

export default Foundation
