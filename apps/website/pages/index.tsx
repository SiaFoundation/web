/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  ContentProject,
  SiteHeading,
  getImageProps,
  webLinks,
  Link,
  Code,
} from '@siafoundation/design-system'
import { Layout } from '../components/Layout'
import { routes } from '../config/routes'
import { AsyncReturnType } from '../lib/types'
import { getCacheArticles } from '../content/articles'
import { getCacheSoftware } from '../content/software'
import { getCacheTutorials } from '../content/tutorials'
import backgroundImage from '../assets/backgrounds/mountain.png'
import renterdImage from '../assets/renterd/renterd-peek.png'
import hostdImage from '../assets/hostd/hostd-peek.png'
import previewImage from '../assets/previews/mountain.png'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { textContent } from '../lib/utils'
import Letter from '../components/Letter'
import { JiggleArrow } from '../components/JiggleArrow'
import { SectionGradient } from '../components/SectionGradient'
import { SectionSimple } from '../components/SectionSimple'
import { SectionWaves } from '../components/SectionWaves'
import { CalloutSoftware } from '../components/CalloutSoftware'
import { usePullTop } from '../hooks/usePullTop'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)
const renterdImageProps = getImageProps(renterdImage)
const hostdImageProps = getImageProps(hostdImage)

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

  const letterEl = useMemo(
    () => <Letter onDone={() => toggleLanding()} />,
    [toggleLanding]
  )

  return (
    <Layout
      title="Decentralized data storage"
      description={textContent(description)}
      path={routes.home.index}
      focus={showLetter ? letterEl : null}
      transitions
      transitionWidthDuration={transitionWidthDuration}
      transitionFadeDelay={transitionFadeDelay}
      heading={
        <SectionSimple className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            size="64"
            title="Decentralized data storage"
            description={description}
            className="relative"
          >
            {pullPending && (
              <JiggleArrow
                title="Go to letter"
                onClick={toggleLanding}
                direction="up"
                className="absolute -mt-3 md:-mt-6"
              />
            )}
            <Link size="20" href={routes.getStarted.index}>
              Download the software →
            </Link>
          </SiteHeading>
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionSimple className="pt-8 md:pt-12 pb-20">
        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
          <Callout
            size="0"
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
            size="0"
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
          <CalloutSoftware
            name="renterd"
            startTime={30}
            variant="subtle"
            description={
              'A next-generation Sia renter, developed by the Sia Foundation. Smart defaults and a highly extensible API.'
            }
            href={routes.software.renterd}
            imageProps={renterdImageProps}
          />
          <CalloutSoftware
            name="hostd"
            variant="subtle"
            startTime={40}
            description={
              'A next-generation Sia host, developed by the Sia Foundation. Built for performance and reliability.'
            }
            imageProps={hostdImageProps}
          />
        </div>
      </SectionSimple>
      <SectionGradient className="md:pt-16 pb-20 md:pb-40">
        <SiteHeading
          size="32"
          title="Storage companies and projects building on Sia"
          className="pb-12 md:pb-20"
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
          columnClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        />
      </SectionGradient>
      <SectionWaves className="pt-7 md:pt-16 pb-14 md:pb-32">
        <SiteHeading
          size="32"
          title="Why projects choose Sia"
          className="pb-12 md:pb-20"
        />
        <ContentGallery
          items={[
            {
              icon: 'Security',
              title: 'Completely Private',
              subtitle: (
                <>
                  Sia encrypts and distributes your files across a decentralized
                  network. Unlike traditional cloud storage providers, you truly
                  own your data: no third party can access your files or prevent
                  you from accessing them.
                </>
              ),
            },
            {
              icon: 'Development',
              title: 'Highly Redundant',
              subtitle: (
                <>
                  Sia distributes and stores redundant file segments on nodes
                  across the globe, eliminating any single point of failure and
                  achieving uptime and throughput that no centralized provider
                  can compete with.
                </>
              ),
            },
            {
              icon: 'Money',
              title: 'Far More Affordable',
              subtitle: (
                <>
                  On average, Sia's decentralized cloud storage costs 90% less
                  than incumbent cloud storage providers. Storing 1 TB of files
                  on Sia costs about $1-2 per month, compared with $23 on Amazon
                  S3 - bandwidth is also a magnitude cheaper.
                </>
              ),
            },
            {
              icon: 'Integration',
              title: 'Designed for integration',
              subtitle: (
                <>
                  The Sia software exposes highly modular JSON-speaking
                  endpoints. <Code>renterd</Code> can even scale horizontally:
                  in stateless mode, it provides raw access to the Sia
                  renter-host protocol, with no UI, no blockchain, and no disk
                  I/O — perfect for massive renting operations.
                </>
              ),
            },
            {
              icon: 'Microscope',
              title: 'R&D leader',
              subtitle: (
                <>
                  The Sia storage network has been securely storing data since
                  2014. Sia has pioneered the use of many new technologies at
                  scale, such as its use of state channels to process an
                  estimated 20 billion micropayments per day.
                </>
              ),
            },
            {
              icon: 'Code',
              title: 'Open Source',
              subtitle: (
                <>
                  Sia's software is completely open source, with contributions
                  from leading software engineers. Sia has a thriving community
                  of developers and companies building innovative applications
                  and businesses on top of Sia.
                </>
              ),
            },
          ]}
        />
      </SectionWaves>
      <SectionGradient className="pt-12 md:pt-32 pb-8 md:pb-20">
        <SiteHeading
          size="32"
          title="Learn how Sia works"
          className="pb-12 md:pb-20"
          links={[
            {
              title: 'Learn about the protocol',
              link: routes.learn.index,
            },
          ]}
          description={
            <>
              Find developer resources, tutorials, software downloads, and more.
            </>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          className="mt-20 md:mt-60 pb-12 md:pb-20"
          title="Read the latest updates"
          description={
            <>
              Read the latest from the core team and the ecosystem of developers
              building technology on top of Sia.
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
        <ContentGallery
          className="mb-32"
          items={featured}
          columnClassName="grid-cols-1"
        />
      </SectionGradient>
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
