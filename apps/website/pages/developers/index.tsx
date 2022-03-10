import { getCounts } from '@siafoundation/data-sources'
import { getHosts, getSiaVersion } from '@siafoundation/env'
import {
  Flex,
  Grid,
  Panel,
  Separator,
  ContentBlock,
  ContentGallery,
  CtaBox,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { external, sitemap } from '../../config/site'
import { getDaysInSeconds } from '../../lib/time'
import { getHref } from '../../lib/url'
import { getArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getSoftware } from '../../content/software'
import { getStats } from '../../content/stats'

const siaVersion = getSiaVersion()
const hosts = getHosts()

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Developers({
  stats,
  counts,
  learningPosts,
  technicalPosts,
  services,
}: Props) {
  return (
    <Layout stats={stats}>
      <ContentBlock
        title="Developer Resources"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!
        `}
      />
      <Flex gap="2">
        <Panel css={{ flex: 2 }}>
          <Grid
            columns={{
              '@initial': '1',
              '@bp2': '2',
            }}
            gap="2"
          >
            <ContentBlock
              title="Sia Daemon"
              subtitle={
                counts
                  ? `${counts.daemon.toLocaleString()} downloads`
                  : undefined
              }
              align="start"
              links={[
                {
                  title: 'Windows',
                  link: getHref(
                    `${hosts.app}/releases/Sia-v${siaVersion.current}-windows-amd64.zip`
                  ),
                  newTab: true,
                },
                {
                  title: 'MacOS',
                  link: getHref(
                    `${hosts.app}/releases/Sia-v${siaVersion.current}-darwin-amd64.zip`
                  ),
                  newTab: true,
                },
                {
                  title: 'Linux',
                  link: getHref(
                    `${hosts.app}/releases/Sia-v${siaVersion.current}-linux-amd64.zip`
                  ),
                  newTab: true,
                },
                {
                  title: 'Raspberry Pi',
                  link: getHref(
                    `${hosts.app}/releases/Sia-v${siaVersion.current}-linux-arm64.zip`
                  ),
                  newTab: true,
                },
                {
                  title: 'Docker',
                  link: 'https://github.com/SiaFoundation/siad/pkgs/container/siad',
                  newTab: true,
                },
              ]}
              description={`
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!
            `}
              size="1"
            />
            <ContentBlock
              title="Sia UI"
              subtitle={
                counts ? `${counts.ui.toLocaleString()} downloads` : undefined
              }
              align="start"
              links={[
                {
                  title: 'Windows',
                  link: getHref(
                    `${hosts.app}/releases/Sia-UI-v${siaVersion.current}.exe`
                  ),
                  newTab: true,
                },
                {
                  title: 'MacOS',
                  link: getHref(
                    `${hosts.app}/releases/Sia-UI-v${siaVersion.current}.dmg`
                  ),
                  newTab: true,
                },
                {
                  title: 'Linux',
                  link: getHref(
                    `${hosts.app}/releases/Sia-UI-v${siaVersion.current}.AppImage`
                  ),
                  newTab: true,
                },
              ]}
              description={`
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!
              `}
              size="1"
            />
          </Grid>
        </Panel>
        <Flex direction="column" gap="2" css={{ flex: 1 }}>
          <ContentBlock
            title="API Reference"
            align="start"
            links={[
              {
                title: 'API Reference',
                link: getHref(hosts.api),
                newTab: true,
              },
            ]}
            description={`
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!
            `}
            size="1"
          />
          <ContentBlock
            title="Documentation"
            align="start"
            links={[
              {
                title: 'Documentation',
                link: external.docs.index,
                newTab: true,
              },
            ]}
            description={`
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!
            `}
            size="1"
          />
        </Flex>
      </Flex>
      <Separator size="4" />
      <ContentGallery
        title="Developer Tutorials"
        description={`
          Technical tutorials for new developers looking to build on Sia.
        `}
        items={learningPosts}
      />
      <Separator size="4" />
      <ContentGallery
        title="Technical Walkthroughs"
        description={`
          Technical posts from the Sia Foundation team and ecosystem building technology on top of Sia.
        `}
        items={technicalPosts}
      />
      <Separator size="4" />
      <ContentGallery
        title="Built on Sia"
        description={`
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, quam.
        `}
        items={services.map((item) => ({ ...item, newTab: true }))}
      />
      <Separator size="4" />
      <CtaBox
        title="Learn"
        description={`
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae, necessitatibus.
        `}
        actionTitle="Read more"
        actionLink={sitemap.learn.index}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const counts = await getCounts()
  const technicalPosts = getArticles('technical')
  const learningPosts = getArticles('learning')
  const services = getSoftware('storage_services')

  const props = {
    stats,
    counts: counts.data,
    technicalPosts,
    learningPosts,
    services,
  }

  return {
    props,
    revalidate: getDaysInSeconds(1),
  }
}

export default Developers
