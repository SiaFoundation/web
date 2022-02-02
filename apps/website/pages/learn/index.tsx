import { Heading, NLink } from '@siafoundation/design-system'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'

function Learn() {
  return (
    <Layout>
      <Heading>Learn</Heading>
      <PlaceholderBlock title="Intro + quick links"></PlaceholderBlock>
      <PlaceholderBlock title="How Sia works overview (graphic)">
        <NLink href={sitemap.learn.howSiaWorks}>How Sia Works</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Get started">
        <NLink href={sitemap.learn.getStarted}>Get started</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Popular tutorials">
        <NLink href={sitemap.learn.getStarted}>Get started</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Whitepaper">
        <NLink href={sitemap.learn.whitepaper}>Whitepaper</NLink>
      </PlaceholderBlock>
    </Layout>
  )
}

export default Learn
