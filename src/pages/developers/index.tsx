import Link from 'next/link'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { apiDomain, appDomain, siaVersion } from '../../config/env'
import { sitemap, social } from '../../config/site'
import { getCounts } from '../../lib/data/counts'
import { getDaysInSeconds } from '../../lib/time'
import { Flex } from '../../system/Flex'
import { Heading } from '../../system/Heading'
import { Text } from '../../system/Text'

function Developers({ counts }) {
  return (
    <Layout>
      <Heading>Developers</Heading>
      <Block title="Intro + quick links">
        <Flex column css={{ gap: '$3' }}>
          <Link href={`https://${apiDomain}`}>API Reference</Link>
          <Link href={social.docs}>Documentation</Link>
          <Text>Core software downloads</Text>
          <Flex css={{ gap: '$3', justifyContent: 'center' }}>
            <Link
              href={`https://${appDomain}/releases/Sia-UI-v${siaVersion.current}.AppImage`}
            >
              {counts.status === 200
                ? `UI (${counts.data.ui} downloads)`
                : 'UI'}
            </Link>
            <Link
              href={`https://${appDomain}/releases/Sia-v${siaVersion.current}-linux-amd64.zip`}
            >
              {counts.status === 200
                ? `Daemon (${counts.data.daemon} downloads)`
                : 'Daemon'}
            </Link>
          </Flex>
        </Flex>
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

export async function getStaticProps() {
  const counts = await getCounts()

  const props = {
    counts,
  }

  return {
    props,
    revalidate: getDaysInSeconds(1),
  }
}

export default Developers
