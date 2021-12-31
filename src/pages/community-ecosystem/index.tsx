import Link from 'next/link'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { sitemap, social } from '../../config/site'
import { Heading } from '../../system/Heading'

function CommunityEcosystem() {
  return (
    <Layout>
      <Heading>Community & ecosystem</Heading>
      <Block title="Intro + quick links">
        <Link href={sitemap.community.getSiacoin}>Get Siacoin</Link>
      </Block>
      <Block title="Blog">
        <Link href={social.blog}>Blog</Link>
      </Block>
      <Block title="News">
        <Link href={sitemap.newsroom.index}>News</Link>
      </Block>
      <Block title="Project list"></Block>
      <Block title="Grants"></Block>
    </Layout>
  )
}

export default CommunityEcosystem
