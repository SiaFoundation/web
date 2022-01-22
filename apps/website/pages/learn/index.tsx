import { Heading, Link } from '@siafoundation/design-system'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'

function Learn() {
  return (
    <Layout>
      <Heading>Learn</Heading>
      <PlaceholderBlock title="Intro + quick links"></PlaceholderBlock>
      <PlaceholderBlock title="How Sia works overview (graphic)">
        <Link href={sitemap.learn.howSiaWorks}>How Sia Works</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Get started">
        <Link href={sitemap.learn.getStarted}>Get started</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Popular tutorials">
        <Link href={sitemap.learn.getStarted}>Get started</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Whitepaper">
        <Link href={sitemap.learn.whitepaper}>Whitepaper</Link>
      </PlaceholderBlock>
    </Layout>
  )
}

export default Learn
