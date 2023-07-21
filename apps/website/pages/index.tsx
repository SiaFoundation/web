/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  SiteHeading,
  webLinks,
  Link,
  Code,
  Text,
} from '@siafoundation/design-system'
import { Layout } from '../components/Layout'
import { routes } from '../config/routes'
import { AsyncReturnType } from '../lib/types'
import { getFeedContent, syncArticlesEvery5min } from '../content/feed'
import { getProjects } from '../content/projects'
import { getTutorialArticles } from '../content/articles'
import { useCallback, useMemo, useState } from 'react'
import { textContent } from '../lib/utils'
import Letter from '../components/Letter'
import { JiggleArrow } from '../components/JiggleArrow'
import { SectionGradient } from '../components/SectionGradient'
import { SectionSolid } from '../components/SectionSolid'
import { SectionTransparent } from '../components/SectionTransparent'
import { usePullTop } from '../hooks/usePullTop'
import { cx } from 'class-variance-authority'
import { backgrounds } from '../content/imageBackgrounds'
import { previews } from '../content/imagePreviews'
import { GlobeSection } from '../components/GlobeSection'
import { CalloutProject } from '../components/CalloutProject'
import { getGeoHosts } from '../content/geoHosts'

const transitionWidthDuration = 300
const transitionFadeDelay = 500

type Props = AsyncReturnType<typeof getServerSideProps>['props']

export default function Home({ featured, tutorials, services, hosts }: Props) {
  const [showLetter, setShowLetter] = useState<boolean>(false)
  const [resetGlobe, setResetGlobe] = useState<string>(String(Math.random()))

  const toggleLanding = useCallback(() => {
    setShowLetter((showLetter) => !showLetter)

    setTimeout(() => {
      document.getElementById('main-scroll').scrollTo({
        top: 0,
      })
      setResetGlobe(String(Math.random()))
    }, transitionWidthDuration)
  }, [setShowLetter, setResetGlobe])

  const pullPending = usePullTop('main-scroll', !showLetter, toggleLanding)

  const letterEl = useMemo(
    () => <Letter onDone={() => toggleLanding()} />,
    [toggleLanding]
  )

  const description = (
    <>
      Cryptography has unleashed the latent power of the Internet by enabling
      interactions between mutually-distrusting parties. Sia{' '}
      <Text color="verySubtle" className="italic" noWrap>
        [sigh-uh]
      </Text>{' '}
      harnesses this power to create a trustless cloud storage marketplace,
      allowing buyers and sellers to transact directly. No intermediaries, no
      borders, no vendor lock-in, no spying, no throttling, no walled gardens;
      it's a return to the Internet we once knew.{' '}
      <Link
        href="/"
        color="subtle"
        className={cx(
          'transition-colors ease-in',
          'underline underline-offset-4 decoration-dotted',
          'decoration-gray-500/50 dark:decoration-gray-800/10',
          'hover:decoration-gray-500/70 hover:dark:decoration-gray-800/20'
        )}
        underline="none"
        onClick={toggleLanding}
      >
        The future is making a comeback.
      </Link>
    </>
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
        <SectionTransparent
          className="pt-24 md:pt-52"
          gradientClassName="via-white/[97%] dark:via-graydark-100/[98%]"
        >
          <SiteHeading
            size="64"
            anchorLink={false}
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
          </SiteHeading>
          <GlobeSection key={resetGlobe} hosts={hosts} />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.mountain}
      previewImage={previews.mountain}
    >
      <SectionSolid className="pt-6 xl:pt-4 pb-20">
        {/* <StatsStrip /> */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
          <Callout
            size="0"
            title="Rent"
            background={backgrounds.leaves}
            description={
              <>Rent space and store your data on the Sia network.</>
            }
            actionTitle="Rent storage"
            actionLink={routes.rent.index}
          />
          <Callout
            size="0"
            title="Host"
            background={backgrounds.jungle}
            description={<>Offer your storage space on the Sia network.</>}
            actionTitle="Start hosting"
            actionLink={routes.host.index}
          />
          <Callout
            size="0"
            title="Learn"
            background={backgrounds.light}
            description={
              <>
                Learn all about how Sia works, why it was created, and the
                non-profit foundation that maintains it.
              </>
            }
            actionTitle="Read more"
            actionLink={routes.learn.index}
          />
          <Callout
            size="0"
            title="Grants"
            background={backgrounds.bamboo}
            description={
              <>
                The Sia Foundation welcomes contributors from all over the world
                to come and build on Sia through our Grants program.
              </>
            }
            actionTitle="Apply for a grant"
            actionLink={routes.grants.index}
          />
        </div>
      </SectionSolid>
      <SectionGradient className="md:pt-16 pb-20 md:pb-40">
        <SiteHeading
          size="32"
          title="Storage companies and projects building on Sia"
          className="pb-12 md:pb-20"
          description={
            <>
              Sia is a thriving ecosystem of data storage enthusiasts, open
              source software, and commercial data storage platforms.
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
          }))}
          component={CalloutProject}
          columnClassName="grid-cols-1 md:grid-cols-2"
          gapClassName="gap-4 sm:gap-5"
        />
      </SectionGradient>
      <SectionTransparent
        background={backgrounds.jungle}
        className="pt-7 md:pt-16 pb-14 md:pb-32"
      >
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
      </SectionTransparent>
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

export async function getServerSideProps() {
  // only run one sync instance on main page
  syncArticlesEvery5min()

  const featured = await getFeedContent(['sia-all', 'featured'], 5)
  const tutorials = await getTutorialArticles()
  const hosts = await getGeoHosts()
  const services = await getProjects('featured', 5)

  return {
    props: {
      featured,
      tutorials,
      hosts,
      services,
      // Because this page is SSR'd, do not block requests with slow stats query
      // fallback: {
      //   '/api/stats': stats,
      // },
    },
  }
}
