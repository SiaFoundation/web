import { getHosts, getSiaVersion } from '@siafoundation/env'
import {
  Flex,
  Grid,
  ContentGallery,
  Callout,
  Section,
  WavesBackdrop,
  Container,
  Code,
  Links,
  ContentProject,
  SiteHeading,
  getImageProps,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { external, sitemap } from '../../config/site'
import { getDaysInSeconds } from '../../lib/time'
import { getHref } from '../../lib/url'
import { getArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getSoftware } from '../../content/software'
import { getStats } from '../../content/stats'
import { omit } from 'lodash'
import background from '../../assets/backgrounds/waterfall.png'
import { SoftwareSection } from '../../components/SoftwareSection'

const backgroundImage = getImageProps(background)

const siaVersion = getSiaVersion()
const hosts = getHosts()

const technical = getArticles(['technical']).map((i) => omit(i, ['icon']))
const tutorials = getArticles(['tutorial'])
const services = getSoftware('storage_services', 3)

const docLinks = [
  {
    title: 'API Reference',
    link: getHref(hosts.api),
    newTab: true,
  },
  {
    title: 'Read the docs',
    link: external.docs.index,
    newTab: true,
  },
]

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Developers({ stats }: Props) {
  return (
    <Layout
      heading={
        <Section size="4">
          <SiteHeading
            size="64"
            title="Developer Resources"
            description={
              <>
                Software downloads, tutorials, technical walkthroughs, and more.
              </>
            }
          />
        </Section>
      }
      stats={stats}
      backgroundImage={backgroundImage}
    >
      <Section
        size="3"
        width="flush"
        css={{ position: 'relative', marginBottom: '$6' }}
      >
        <WavesBackdrop />
        <Container>
          <Flex direction="column" gap="5">
            <SiteHeading size="32" title="Core Software" />
            <Flex direction="column" gap="9">
              <Grid
                columns={{
                  '@initial': '1',
                  '@bp2': '2',
                }}
                gap="5"
                gapY="8"
              >
                <SoftwareSection
                  title="Sia UI"
                  description={
                    <>
                      Built for users who prefer to work with a Graphical User
                      Interface.
                    </>
                  }
                  version={siaVersion.current}
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
                />
                <SoftwareSection
                  title="Sia Daemon"
                  description={
                    <>
                      Built for technical users comfortable with command line
                      interfaces.
                    </>
                  }
                  version={siaVersion.current}
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
                />
                <SoftwareSection
                  title="Embarcadero"
                  description={
                    <>
                      Embarcadero is a tool for conducting escrowless SF
                      {'<->'}SC swaps.
                    </>
                  }
                  version={siaVersion.embc}
                  links={[
                    {
                      title: 'Windows',
                      link: getHref(
                        `${hosts.app}/releases/embc-v${siaVersion.embc}-windows-amd64.zip`
                      ),
                      newTab: true,
                    },
                    {
                      title: 'MacOS',
                      link: getHref(
                        `${hosts.app}/releases/embc-v${siaVersion.embc}-darwin-amd64.zip`
                      ),
                      newTab: true,
                    },
                    {
                      title: 'Linux',
                      link: getHref(
                        `${hosts.app}/releases/embc-v${siaVersion.embc}-linux-amd64.zip`
                      ),
                      newTab: true,
                    },
                  ]}
                />
              </Grid>
              <Flex direction="column" gap="5">
                <SiteHeading
                  size="20"
                  title="Documentation"
                  description={
                    <>
                      Read our documentation to learn how Sia works or visit the
                      API reference to learn about specific <Code>siad</Code>{' '}
                      parameters and endpoints.
                    </>
                  }
                />
                <Links links={docLinks} size="3" />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Developer Tutorials"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Technical Walkthroughs"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columns="1" items={technical} />
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Built on Sia"
          description={
            <>
              Sia is a thriving ecosystem of open source software, layer 2
              networks, and commercial data storage platforms.
            </>
          }
          links={[
            {
              title: 'Browse the entire ecosystem',
              link: sitemap.community.index,
            },
          ]}
        />
        <ContentGallery
          component={ContentProject}
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 3,
          }}
          items={services}
        />
      </Section>
      <Section>
        <Callout
          title="Sia 101"
          size="2"
          description={
            <>
              Learn how the Sia protocol works to power redundant,
              decentralized, data storage.
            </>
          }
          actionTitle="Learn more"
          actionLink={sitemap.learn.index}
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()

  const props = {
    stats,
  }

  return {
    props,
    revalidate: getDaysInSeconds(1),
  }
}

export default Developers
