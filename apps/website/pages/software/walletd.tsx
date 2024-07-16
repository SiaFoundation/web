/* eslint-disable react/no-unescaped-entities */
import {
  Callout,
  Code,
  ContentGallery,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { useInView } from 'react-intersection-observer'
import { CarouselWalletd } from '../../components/CarouselWalletd'
import { DownloadSection } from '../../components/DownloadSection'
import { Layout } from '../../components/Layout'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionTransparent } from '../../components/SectionTransparent'
import { routes } from '../../config/routes'
import { getTutorialArticles } from '../../content/articles'
import { backgrounds, previews } from '../../content/assets'
import { getFeedContent } from '../../content/feed'
import { getProjects } from '../../content/projects'
import {
  getWalletdLatestDaemonRelease,
  getWalletdLatestDesktopRelease,
} from '../../content/releases'
import { getStats } from '../../content/stats'
import { getMinutesInSeconds } from '../../lib/time'
import type { AsyncReturnType } from '../../lib/types'
import { textContent } from '../../lib/utils'

const title = 'walletd'
const daemon = 'walletd'
const description = (
  <>
    <Code>walletd</Code> is the flagship Sia wallet, suitable for miners,
    exchanges, and everyday hodlers. Its client-server architecture gives you
    the flexibility to access your funds from anywhere, on any device, without
    compromising the security of your private keys. The server is agnostic, so
    you can derive those keys from a 12-word seed phrase, a legacy (siad)
    28-word phrase, a Ledger hardware wallet, or another preferred method. Like
    other Foundation node software, <Code>walletd</Code> ships with a slick
    embedded UI, but developers can easily build headless integrations
    leveraging its powerful JSON API. Whether you're using a single address or
    millions, <Code>walletd</Code> scales to your needs.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Walletd({
  releaseDaemon,
  releaseDesktop,
  technical,
  tutorials,
}: Props) {
  const { ref: appRef, inView: appInView } = useInView()

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.software.walletd}
      heading={
        <SectionTransparent className="pt-24 md:pt-32 pb-0">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.bamboo}
      previewImage={previews.walletd}
    >
      <SectionGradient className="pb:30">
        <DownloadSection
          daemon={daemon}
          releaseDaemon={releaseDaemon}
          releaseDesktop={releaseDesktop}
          testnetOnly
        />
        <div className="relative">
          <div ref={appRef} className="absolute top-[70%]" />
          <div
            className={cx(
              'relative transition-transform',
              appInView ? 'md:scale-[1.03]' : '',
            )}
          >
            <CarouselWalletd />
          </div>
        </div>
      </SectionGradient>
      <SectionGradient>
        <SiteHeading
          size="32"
          className="mt-12 md:mt-24 pb-12 md:pb-20"
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          className="mt-32 md:mt-60"
          title="Learn about the technology behind Sia"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columnClassName="grid-cols-1" items={technical} />
        <Callout
          title="Learn more about walletd"
          className="mt-24 md:mt-40 mb-24 md:mb-48"
          size="2"
          background={previews.natePath}
          description={
            <>
              Join the Sia Discord to chat with the team and community about{' '}
              <Code>walletd</Code> development, features, use-cases, bugs, and
              more.
            </>
          }
          actionTitle="Join the Discord"
          actionLink={webLinks.discord}
        />
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const [stats, technical, tutorials, releaseDaemon, releaseDesktop, services] =
    await Promise.all([
      getStats(),
      getFeedContent(['technical'], 8),
      getTutorialArticles(),
      getWalletdLatestDaemonRelease(),
      getWalletdLatestDesktopRelease(),
      getProjects('storage_services', 5),
    ])

  const props = {
    technical,
    tutorials,
    services,
    releaseDaemon,
    releaseDesktop,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
