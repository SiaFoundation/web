/* eslint-disable react/no-unescaped-entities */
import {
  Grid,
  ContentGallery,
  Callout,
  WavesBackdrop,
  ContentProject,
  Section,
  SiteHeading,
  getImageProps,
  Flex,
  Text,
  usePullTop,
  webLinks,
  NextLink,
} from '@siafoundation/design-system'
import { Layout } from '../components/Layout'
import { routes } from '../config/routes'
import { AsyncReturnType } from '../lib/types'
import { getCacheArticles } from '../content/articles'
import { getCacheSoftware } from '../content/software'
import { getCacheTutorials } from '../content/tutorials'
import backgroundImage from '../assets/backgrounds/mountain.png'
import previewImage from '../assets/previews/mountain.png'
import { useCallback, useEffect, useState } from 'react'
import { textContent } from '../lib/utils'
import Letter from '../components/Letter'
import { JiggleArrow } from '../components/JiggleArrow'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const description = (
  <>
    Cryptography has unleashed the latent power of the Internet by enabling
    interactions between mutually-distrusting parties. Sia harnesses this power
    to create a trustless cloud storage marketplace, allowing buyers and sellers
    to transact directly. No intermediaries, no borders, no vendor lock-in, no
    spying, no throttling, no walled gardens; it's a return to the Internet we
    once knew. The future is making a comeback.
  </>
)

const transitionWidthDuration = 300
const transitionFadeDelay = 500

type Props = AsyncReturnType<typeof getServerSideProps>['props']

export default function Home({
  featured,
  tutorials,
  services,
  seenLetter,
}: Props) {
  const [showLetter, setShowLetter] = useState<boolean>(!seenLetter)

  useEffect(() => {
    document.cookie =
      'seen-letter=true; max-age=2147483647; SameSite=None; Secure'
  }, [])

  const toggleLanding = useCallback(() => {
    setShowLetter((showLetter) => !showLetter)

    setTimeout(() => {
      document.getElementById('main-scroll').scrollTo({
        top: 0,
      })
    }, transitionWidthDuration)
  }, [setShowLetter])

  const pullPending = usePullTop('main-scroll', !showLetter, toggleLanding)

  return (
    <Layout
      title="Decentralized data storage"
      description={textContent(description)}
      path={routes.home.index}
      focus={showLetter ? <Letter onDone={() => toggleLanding()} /> : null}
      transitions
      transitionWidthDuration={transitionWidthDuration}
      transitionFadeDelay={transitionFadeDelay}
      heading={
        <Section
          py="4"
          css={{
            paddingBottom: '$8',
          }}
        >
          <SiteHeading
            size="64"
            title="Decentralized data storage"
            description={description}
            css={{ position: 'relative' }}
          >
            {pullPending && (
              <JiggleArrow
                title="Go to letter"
                onClick={toggleLanding}
                direction="up"
                css={{
                  position: 'absolute',
                  marginTop: '-50px',
                }}
              />
            )}
            <Flex gap="2" css={{ marginTop: '$1' }}>
              <Text size="20">
                <NextLink href={routes.getStarted.index}>
                  Download the software →
                </NextLink>
              </Text>
            </Flex>
          </SiteHeading>
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section py="3">
        <Grid
          gap={{
            '@initial': '4',
            '@bp2': '3',
          }}
          columns={{
            '@initial': '1',
            '@bp2': '2',
          }}
        >
          <Callout
            title="Start"
            startTime={0}
            description={
              <>
                Find software downloads, beginner tutorials, developer
                resources, technical walkthroughs, and more.
              </>
            }
            actionTitle="Get started"
            actionLink={routes.getStarted.index}
          />
          <Callout
            title="Learn"
            startTime={20}
            description={
              <>
                Learn all about how Sia works, why it was created, and the
                foundation that maintains it.
              </>
            }
            actionTitle="Read more"
            actionLink={routes.learn.index}
          />
        </Grid>
      </Section>
      <Section py="3" width="flush">
        <Section
          width="flush"
          py="2"
          pb="3"
          css={{
            position: 'relative',
            zIndex: 1,
            borderTop: '$sizes$frame solid $slate3',
            borderBottom: '$sizes$frame solid $slate3',
          }}
        >
          <WavesBackdrop />
          <Section py="2" gap="6">
            <SiteHeading size="32" title="Why Sia" />
            <ContentGallery
              items={[
                {
                  icon: 'Security',
                  title: 'Completely Private',
                  subtitle: (
                    <>
                      Sia encrypts and distributes your files across a
                      decentralized network. Unlike traditional cloud storage
                      providers, you truly own your data: no third party can
                      access your files or prevent you from accessing them.
                    </>
                  ),
                },
                {
                  icon: 'Development',
                  title: 'Highly Redundant',
                  subtitle: (
                    <>
                      Sia distributes and stores redundant file segments on
                      nodes across the globe, eliminating any single point of
                      failure and achieving uptime and throughput that no
                      centralized provider can compete with.
                    </>
                  ),
                },
                {
                  icon: 'Code',
                  title: 'Open Source',
                  subtitle: (
                    <>
                      Sia's software is completely open source, with
                      contributions from leading software engineers and a
                      thriving community of developers building innovative
                      applications on the Sia API.
                    </>
                  ),
                },
                {
                  icon: 'Money',
                  title: 'Far More Affordable',
                  subtitle: (
                    <>
                      On average, Sia's decentralized cloud storage costs 90%
                      less than incumbent cloud storage providers. Storing 1 TB
                      of files on Sia costs about $1-2 per month, compared with
                      $23 on Amazon S3.
                    </>
                  ),
                },
              ]}
            />
          </Section>
        </Section>
      </Section>
      <Section gap="12" py="3">
        <Section width="flush" py="0">
          <SiteHeading
            size="32"
            title="Explore the companies and projects building on Sia"
            description={
              <>
                Sia is a thriving ecosystem of open source software, layer 2
                networks, and commercial data storage platforms.
              </>
            }
            links={[
              {
                title: 'Browse all projects',
                link: routes.community.index,
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
              '@bp4': 3,
            }}
          />
        </Section>
        <Section width="flush" py="2">
          <SiteHeading
            size="24"
            title="Learn how Sia works"
            description={
              <>
                Visit the developer pages for software downloads and developer
                resources, tutorials, technical walkthroughs, and more.
              </>
            }
          />
          <ContentGallery items={tutorials} />
        </Section>
        <Section width="flush" py="3">
          <SiteHeading
            size="32"
            title="Read some of the latest updates"
            description={
              <>
                Read the latest from the core team and the ecosystem of
                developers building technology on top of Sia.
              </>
            }
            links={[
              {
                title: 'Browse the blog',
                link: webLinks.blog,
                newTab: true,
              },
            ]}
          />
          <ContentGallery items={featured} columns="1" />
        </Section>
      </Section>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const seenLetter: boolean = req.cookies['seen-letter'] || false
  const featured = await getCacheArticles(['sia-featured'], 5)
  const tutorials = await getCacheTutorials()
  const services = await getCacheSoftware('storage_services', 5)

  return {
    props: {
      featured,
      tutorials,
      services,
      seenLetter,
      // Because this page is SSR'd, do not block requests with slow stats query
      // fallback: {
      //   '/api/stats': stats,
      // },
    },
  }
}
