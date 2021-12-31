import Link from 'next/link'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { sitemap, social } from '../../config/site'
import { Flex } from '../../system/Flex'
import { Heading } from '../../system/Heading'
import { Text } from '../../system/Text'

function Developers() {
  return (
    <Layout>
      <Heading>Developers</Heading>
      <Block title="Intro + quick links">
        <Text>Api Reference</Text>
        <Text>Documentation</Text>
        <Text>Core software downloads</Text>
      </Block>
      <Block title="Blog posts">
        <Link href={social.blog}>Blog</Link>
      </Block>
      <Block title="Featured ecosystem projects">
        <Link href={sitemap.community.index}>Community & ecosystem</Link>
      </Block>
      <Block title="Learn">
        <Flex column css={{ gap: '$3', margin: '$3' }}>
          <Block title="How Sia works">
            <Link href={sitemap.learn.howSiaWorks}>How Sia works</Link>
          </Block>
          <Block title="Get started">
            <Link href={sitemap.learn.getStarted}>How Sia works</Link>
          </Block>
          <Block title="Highlighted tutorials"></Block>
        </Flex>
      </Block>
    </Layout>
  )
}

export default Developers
