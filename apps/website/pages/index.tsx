/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  SiteHeading,
  webLinks,
  Code,
  Text,
} from '@siafoundation/design-system'
import { Layout } from '../components/Layout'
import { routes } from '../config/routes'
import { AsyncReturnType } from '../lib/types'
import { getFeedContent } from '../content/feed'
import { getProjects } from '../content/projects'
import { getTutorialArticles } from '../content/articles'
import { textContent } from '../lib/utils'
import { SectionGradient } from '../components/SectionGradient'
import { SectionSolid } from '../components/SectionSolid'
import { SectionTransparent } from '../components/SectionTransparent'
import { backgrounds, patterns, previews } from '../content/assets'
import { HostMap } from '../components/HostMap'
import { CalloutProject } from '../components/CalloutProject'
import { getGeoHosts } from '../content/geoHosts'
import { getStats } from '../content/stats'
import { minutesInSeconds } from '@siafoundation/units'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Home({ featured, tutorials, services, hosts }: Props) {
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
      it's a return to the Internet we once knew. The future is making a
      comeback.
    </>
  )

  return (
    <Layout
      title="Decentralized data storage"
      description={textContent(description)}
      path={routes.home.index}
      heading={
        <SectionTransparent
          className="pt-24 md:pt-52"
          gradientClassName="via-white/[96%] dark:via-graydark-100/[98%]"
        >
          <SiteHeading
            size="64"
            anchorLink={false}
            title="Decentralized data storage"
            description={description}
            className="relative z-10"
          />
          <HostMap hosts={hosts} />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.mountain}
      previewImage={previews.mountain}
    >
      <SectionSolid className="pt-4 pb-20">
        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
          <Callout
            size="0"
            title="Rent"
            background={patterns.leaves}
            description={
              <>Rent space and store your data on the Sia network.</>
            }
            actionTitle="Rent storage on Sia"
            actionLink={routes.rent.index}
          />
          <Callout
            size="0"
            title="Host"
            background={patterns.jungle}
            description={<>Offer your storage space on the Sia network.</>}
            actionTitle="Start hosting on Sia"
            actionLink={routes.host.index}
          />
          <Callout
            size="0"
            title="Learn"
            background={patterns.light}
            description={
              <>
                Learn all about how Sia works, why it was created, and the
                non-profit foundation that maintains it.
              </>
            }
            actionTitle="Learn how Sia works"
            actionLink={routes.learn.index}
          />
          <Callout
            size="0"
            title="Grants"
            background={patterns.bamboo}
            description={
              <>
                The Sia Foundation welcomes contributors from all over the world
                to come and build on Sia through our Grants program.
              </>
            }
            actionTitle="Apply for a developer grant"
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
      <SectionTransparent className="pt-7 md:pt-16 pb-14 md:pb-32">
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

export async function getStaticProps() {
  const featured = await getFeedContent(['sia-all', 'featured'], 5)
  const tutorials = await getTutorialArticles()
  const hosts = await getGeoHosts()
  const services = await getProjects('featured', 5)
  const stats = await getStats()

  const props = {
    featured,
    tutorials,
    hosts,
    services,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: minutesInSeconds(5),
  }
}
