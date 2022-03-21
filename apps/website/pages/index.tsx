import {
  Box,
  Grid,
  IbmSecurity24,
  Share24,
  Money24,
  Api24,
  ContentGallery,
  Callout,
  WavesBackdrop,
  ContentProject,
  Section,
  SiteHeading,
  getImageProps,
  Link,
} from '@siafoundation/design-system'
import { omit } from 'lodash'
import { MDXRemote } from 'next-mdx-remote'
import { Layout } from '../components/Layout'
import { external, sitemap } from '../config/site'
import { getDaysInSeconds } from '../lib/time'
import { getStats } from '../content/stats'
import { getMdxFile } from '../lib/mdx'
import { AsyncReturnType } from '../lib/types'
import { getArticles } from '../content/articles'
import { getSoftware } from '../content/software'
import background from '../assets/backgrounds/mountain.png'
import useLocalStorageState from 'use-local-storage-state'
import { useCallback } from 'react'

const backgroundImage = getImageProps(background)

const tutorials = getArticles(['tutorial'])
const latest = getArticles(['latest']).map((i) => omit(i, ['icon']))
const services = getSoftware('storage_services', 3)

const defaultConfig = {
  showLanding: true,
}

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Home({ stats, landing }: Props) {
  const [userConfig, setUserConfig] = useLocalStorageState('v0/userConfig', {
    ssr: true,
    defaultValue: defaultConfig,
  })

  // In case we want to allow users to turn off the long landing message
  const toggleLanding = useCallback(() => {
    setUserConfig((config) => ({
      ...config,
      showLanding: !config.showLanding,
    }))
  }, [setUserConfig])

  return (
    <Layout
      stats={stats}
      heading={
        userConfig.showLanding ? (
          <Section size="3">
            <Box
              css={{
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <MDXRemote {...landing.source} />
              {/* <Link onClick={toggleLanding}>Read less</Link> */}
            </Box>
          </Section>
        ) : (
          <Section size="1">
            <SiteHeading
              size="3"
              title="Cloud storage for a decentralized future"
            />
            <Link onClick={toggleLanding}>Read more</Link>
          </Section>
        )
      }
      backgroundImage={backgroundImage}
    >
      <Section width="flush">
        <Section
          width="flush"
          size="1"
          css={{ position: 'relative', marginBottom: '$6' }}
        >
          <WavesBackdrop />
          <Section size="1" gap="6">
            <SiteHeading size="2" title="Why Sia" />
            <ContentGallery
              items={[
                {
                  icon: <IbmSecurity24 />,
                  title: 'Completely Private',
                  subtitle: (
                    <>
                      Sia encrypts and distributes your files across a
                      decentralized network. You control your private encryption
                      keys and you own your data. No outside company or third
                      party can access or control your files, unlike traditional
                      cloud storage providers.
                    </>
                  ),
                },
                {
                  icon: <Api24 />,
                  title: 'Highly Redundant',
                  subtitle: (
                    <>
                      Sia distributes and stores redundant file segments on
                      nodes across the globe, eliminating any single point of
                      failure and ensuring uptime that rivals traditional cloud
                      storage providers.
                    </>
                  ),
                },
                {
                  icon: <Share24 />,
                  title: 'Open Source',
                  subtitle: (
                    <>
                      Sia&apos;s software is completely open source, with
                      contributions from leading software engineers and a
                      thriving community of developers building innovative
                      applications on the Sia API.
                    </>
                  ),
                },
                {
                  icon: <Money24 />,
                  title: 'Far More Affordable',
                  subtitle: (
                    <>
                      On average, Sia&apos;s decentralized cloud storage costs
                      90% less than incumbent cloud storage providers. Storing
                      1TB of files on Sia costs about $1-2 per month, compared
                      with $23 on Amazon S3.
                    </>
                  ),
                },
              ]}
            />
          </Section>
        </Section>
      </Section>
      <Section>
        <Grid
          gap={{
            '@initial': '4',
            '@bp2': '5',
          }}
          columns={{
            '@initial': '1',
            '@bp2': '2',
          }}
        >
          <Callout
            title="Developer Resources"
            startTime={0}
            description={
              <>
                Visit the developer pages for software downloads and developer
                resources, tutorials, technical walkthroughs, and more.
              </>
            }
            actionTitle="Explore"
            actionLink={sitemap.developers.index}
          />
          <Callout
            title="Learn"
            startTime={20}
            description={
              <>
                Learn all about how Sia works, why it&apos;s here, and who
                maintains it.
              </>
            }
            actionTitle="Read more"
            actionLink={sitemap.learn.index}
          />
        </Grid>
      </Section>
      <Section gap="12">
        <Section width="flush" size="0">
          <SiteHeading
            size="2"
            title="Explore the Sia Community &amp; Ecosystem"
            description={
              <>
                Sia is a thriving ecosystem of open source software, commercial
                data storage platforms, and other tools - made possible by a
                vibrant community of contributors.
              </>
            }
            links={[
              {
                title: 'Browse all projects',
                link: sitemap.community.index,
              },
            ]}
          />
          <ContentGallery
            items={services.map((i) => ({
              ...i,
              newTab: true,
            }))}
            component={ContentProject}
            columns={{
              '@initial': 1,
              '@bp2': 2,
              '@bp3': 3,
            }}
          />
        </Section>
        <Section width="flush" size="0">
          <SiteHeading
            size="2"
            title="Start Building"
            description={
              <>
                Visit the developer pages for software downloads and developer
                resources, tutorials, technical walkthroughs, and more.
              </>
            }
          />
          <ContentGallery
            items={tutorials.map((i) => ({ ...i, newTab: true }))}
          />
        </Section>
        <Section width="flush" size="0">
          <SiteHeading
            size="2"
            title="The Latest"
            description={<>Read the latest content on the official Sia blog.</>}
            links={[
              {
                title: 'Browse the blog',
                link: external.blog,
                newTab: true,
              },
            ]}
          />
          <ContentGallery
            items={latest.map((i) => ({ ...i, newTab: true }))}
            columns={'1'}
          />
        </Section>
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const landing = await getMdxFile('content/sections/landing.mdx')

  return {
    props: {
      stats,
      landing,
    },
    revalidate: getDaysInSeconds(1),
  }
}
