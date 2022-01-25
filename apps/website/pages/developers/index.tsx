import { getCounts } from '@siafoundation/data-sources'
import { getHosts, getSiaVersion } from '@siafoundation/env'
import { Flex, Heading, Link, Text } from '@siafoundation/design-system'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { sitemap, external } from '../../config/site'
import { getDaysInSeconds } from '../../lib/time'
import { getHref } from '../../lib/url'

const siaVersion = getSiaVersion()
const hosts = getHosts()

function Developers({ counts }) {
  return (
    <Layout>
      <Heading>Developers</Heading>
      <PlaceholderBlock title="Intro + quick links">
        <Flex direction="column" gap="3">
          <Link href={getHref(hosts.api)}>API Reference</Link>
          <Link href={external.docs}>Documentation</Link>
          <Text>Core software downloads</Text>
          <Flex gap="3" justify="center">
            <Link
              href={getHref(
                `${hosts.app}/releases/Sia-UI-v${siaVersion.current}.AppImage`
              )}
            >
              {counts.status === 200
                ? `UI (${counts.data.ui} downloads)`
                : 'UI'}
            </Link>
            <Link
              href={getHref(
                `${hosts.app}/releases/Sia-v${siaVersion.current}-linux-amd64.zip`
              )}
            >
              {counts.status === 200
                ? `Daemon (${counts.data.daemon} downloads)`
                : 'Daemon'}
            </Link>
          </Flex>
        </Flex>
      </PlaceholderBlock>
      <PlaceholderBlock title="Blog posts">
        <Link href={external.blog}>Blog</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Featured ecosystem projects">
        <Link href={sitemap.community.index}>Community & ecosystem</Link>
      </PlaceholderBlock>
      <PlaceholderBlock title="Learn">
        <Flex direction="column" gap="3" css={{ margin: '$3' }}>
          <PlaceholderBlock title="How Sia works">
            <Link href={sitemap.learn.howSiaWorks}>How Sia works</Link>
          </PlaceholderBlock>
          <PlaceholderBlock title="Get started">
            <Link href={sitemap.learn.getStarted}>How Sia works</Link>
          </PlaceholderBlock>
          <PlaceholderBlock title="Highlighted tutorials"></PlaceholderBlock>
        </Flex>
      </PlaceholderBlock>
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
