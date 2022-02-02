import { getCounts } from '@siafoundation/data-sources'
import { getHosts, getSiaVersion } from '@siafoundation/env'
import { Flex, Heading, NLink, Text } from '@siafoundation/design-system'
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
          <NLink href={getHref(hosts.api)}>API Reference</NLink>
          <NLink href={external.docs}>Documentation</NLink>
          <Text>Core software downloads</Text>
          <Flex gap="3" justify="center">
            <NLink
              href={getHref(
                `${hosts.app}/releases/Sia-UI-v${siaVersion.current}.AppImage`
              )}
            >
              {counts.status === 200
                ? `UI (${counts.data.ui} downloads)`
                : 'UI'}
            </NLink>
            <NLink
              href={getHref(
                `${hosts.app}/releases/Sia-v${siaVersion.current}-linux-amd64.zip`
              )}
            >
              {counts.status === 200
                ? `Daemon (${counts.data.daemon} downloads)`
                : 'Daemon'}
            </NLink>
          </Flex>
        </Flex>
      </PlaceholderBlock>
      <PlaceholderBlock title="Blog posts">
        <NLink href={external.blog}>Blog</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Featured ecosystem projects">
        <NLink href={sitemap.community.index}>Community & ecosystem</NLink>
      </PlaceholderBlock>
      <PlaceholderBlock title="Learn">
        <Flex direction="column" gap="3" css={{ margin: '$3' }}>
          <PlaceholderBlock title="How Sia works">
            <NLink href={sitemap.learn.howSiaWorks}>How Sia works</NLink>
          </PlaceholderBlock>
          <PlaceholderBlock title="Get started">
            <NLink href={sitemap.learn.getStarted}>How Sia works</NLink>
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
