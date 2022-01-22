import { Heading, Link } from '@siafoundation/design-system'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { sitemap, external } from '../../config/site'

function CommunityEcosystem() {
  return (
    <Layout>
      <Heading>Community & ecosystem</Heading>
      <PlaceholderBlock title="Intro + quick links">
        <Link href={sitemap.community.getSiacoin}>Get Siacoin</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Blog">
        <Link href={external.blog}>Blog</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="News">
        <Link href={sitemap.newsroom.index}>News</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Project list"></PlaceholderBlock>
      <PlaceholderBlock title="Grants"></PlaceholderBlock>
    </Layout>
  )
}

export default CommunityEcosystem
