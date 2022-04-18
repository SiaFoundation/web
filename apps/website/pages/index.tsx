/* eslint-disable react/no-unescaped-entities */
import {
  Grid,
  IbmSecurity24,
  Money24,
  Development24,
  Code24,
  ContentGallery,
  Callout,
  WavesBackdrop,
  ContentProject,
  Section,
  SiteHeading,
  getImageProps,
  Link,
  Flex,
  Text,
} from '@siafoundation/design-system'
import { omit } from 'lodash'
import { Layout } from '../components/Layout'
import { external, sitemap } from '../config/site'
import { AsyncReturnType } from '../lib/types'
import { getArticles } from '../content/articles'
import { getSoftware } from '../content/software'
import backgroundImage from '../assets/backgrounds/mountain.png'
import previewImage from '../assets/previews/mountain.png'
import { useCallback, useState } from 'react'
import { textContent } from '../lib/utils'
import Letter from '../components/Letter'
import Italic from '../components/Italic'

const tutorials = getArticles(['tutorial'])
const latest = getArticles(['latest']).map((i) => omit(i, ['icon']))
const services = getSoftware('storage_services', 3)

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const description = (
  <>
    Cryptography has unleashed the latent power of the Internet by enabling
    interactions between mutually-distrustful parties. Sia harnesses this power
    to turn the cloud storage market into a proper market<Italic>place</Italic>,
    where buyers and sellers can transact directly, with no intermediaries,
    anywhere in the world. No more silos or walled gardens: your data is
    encrypted, so it can't be spied on, and it's stored on many servers, so no
    single entity can hold it hostage. Thanks to projects like Sia, the Internet
    is being re-decentralized.
  </>
)

const transitionDuration = 300

type Props = AsyncReturnType<typeof getServerSideProps>['props']

export default function Home({ seenLetter }: Props) {
  const [showLetter, setShowLetter] = useState<boolean>(!seenLetter)

  const toggleLanding = useCallback(() => {
    setShowLetter((showLetter) => {
      const show = !showLetter

      if (show) {
        document.cookie = 'seen-letter=false; max-age=0; SameSite=None; Secure'
      } else {
        document.cookie =
          'seen-letter=true; max-age=2147483647; SameSite=None; Secure'
      }
      return show
    })

    setTimeout(() => {
      document.getElementById('main-scroll').scrollTo({
        top: 0,
      })
    }, transitionDuration)
  }, [setShowLetter])

  return (
    <Layout
      title="Decentralized data storage"
      description={textContent(description)}
      path={sitemap.home.index}
      focus={showLetter}
      transitionDuration={transitionDuration}
      onLogoClick={!showLetter ? toggleLanding : undefined}
      heading={
        <Section
          size="4"
          css={{
            paddingBottom: '$8',
          }}
        >
          <SiteHeading
            size="64"
            title="Decentralized data storage"
            description={description}
          >
            <Flex gap="2" css={{ marginTop: '$1' }}>
              <Text size="20">
                <Link href={sitemap.developers.index}>
                  Download the software →
                </Link>
              </Text>
            </Flex>
          </SiteHeading>
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      {showLetter ? (
        <Letter onDone={() => toggleLanding()} />
      ) : (
        <>
          <Section size="3">
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
                title="Developers"
                startTime={0}
                description={
                  <>
                    Browse software downloads and developer resources,
                    tutorials, technical walkthroughs, and more.
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
                    Learn all about how Sia works, why it was created, and the
                    foundation that maintains it.
                  </>
                }
                actionTitle="Read more"
                actionLink={sitemap.learn.index}
              />
            </Grid>
          </Section>
          <Section size="3" width="flush">
            <Section width="flush" size="1" css={{ position: 'relative' }}>
              <WavesBackdrop />
              <Section size="2" gap="6">
                <SiteHeading size="32" title="Why Sia" />
                <ContentGallery
                  items={[
                    {
                      icon: <IbmSecurity24 />,
                      title: 'Completely Private',
                      subtitle: (
                        <>
                          Sia encrypts and distributes your files across a
                          decentralized network. You control your private
                          encryption keys and you own your data. No outside
                          company or third party can access or control your
                          files, unlike traditional cloud storage providers.
                        </>
                      ),
                    },
                    {
                      icon: <Development24 />,
                      title: 'Highly Redundant',
                      subtitle: (
                        <>
                          Sia distributes and stores redundant file segments on
                          nodes across the globe, eliminating any single point
                          of failure and ensuring uptime that rivals traditional
                          cloud storage providers.
                        </>
                      ),
                    },
                    {
                      icon: <Code24 />,
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
                      icon: <Money24 />,
                      title: 'Far More Affordable',
                      subtitle: (
                        <>
                          On average, Sia's decentralized cloud storage costs
                          90% less than incumbent cloud storage providers.
                          Storing 1TB of files on Sia costs about $1-2 per
                          month, compared with $23 on Amazon S3.
                        </>
                      ),
                    },
                  ]}
                />
              </Section>
            </Section>
          </Section>
          <Section gap="12">
            <Section width="flush" size="0">
              <SiteHeading
                size="32"
                title="Explore the Sia Community &amp; Ecosystem"
                description={
                  <>
                    Sia is a thriving ecosystem of open source software, layer 2
                    networks, and commercial data storage platforms.
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
                  '@bp4': 3,
                }}
              />
            </Section>
            <Section width="flush" size="0">
              <SiteHeading
                size="24"
                title="Start Building"
                description={
                  <>
                    Visit the developer pages for software downloads and
                    developer resources, tutorials, technical walkthroughs, and
                    more.
                  </>
                }
              />
              <ContentGallery items={tutorials} />
            </Section>
            <Section width="flush" size="3">
              <SiteHeading
                size="32"
                title="The Latest"
                description={
                  <>
                    Read the latest from the core team and the ecosystem of
                    developers building technology on top of Sia.
                  </>
                }
                links={[
                  {
                    title: 'Browse the blog',
                    link: external.blog,
                    newTab: true,
                  },
                ]}
              />
              <ContentGallery items={latest} columns="1" />
            </Section>
          </Section>
        </>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const seenLetter: boolean = req.cookies['seen-letter'] || false

  return {
    props: {
      seenLetter,
    },
  }
}
