import { Heading, NLink } from '@siafoundation/design-system'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { sitemap, external } from '../../config/site'

function CommunityEcosystem() {
  return (
    <Layout>
      <Heading>Community & ecosystem</Heading>
      <PlaceholderBlock title="Intro + quick links">
        <NLink href={sitemap.community.getSiacoin}>Get Siacoin</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Blog">
        <NLink href={external.blog}>Blog</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="News">
        <NLink href={sitemap.newsroom.index}>News</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Project list"></PlaceholderBlock>
      <PlaceholderBlock title="Grants"></PlaceholderBlock>
    </Layout>
  )
}

export default CommunityEcosystem
