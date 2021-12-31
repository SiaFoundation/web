import Link from 'next/link'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { Heading } from '../../system/Heading'

function Learn() {
  return (
    <Layout>
      <Heading>Learn</Heading>
      <Block title="Intro + quick links"></Block>
      <Block title="How Sia works overview (graphic)">
        <Link href={sitemap.learn.howSiaWorks}>How Sia Works</Link>
      </Block>
      <Block title="Get started">
        <Link href={sitemap.learn.getStarted}>Get started</Link>
      </Block>
      <Block title="Popular tutorials">
        <Link href={sitemap.learn.getStarted}>Get started</Link>
      </Block>
      <Block title="Whitepaper">
        <Link href={sitemap.learn.whitepaper}>Whitepaper</Link>
      </Block>
    </Layout>
  )
}

export default Learn
