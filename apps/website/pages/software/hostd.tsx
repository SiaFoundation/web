/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  Code,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { getFeedContent } from '../../content/feed'
import { AsyncReturnType } from '../../lib/types'
import { getProjects } from '../../content/projects'
import { getStats } from '../../content/stats'
import { getTutorialArticles } from '../../content/articles'
import { textContent } from '../../lib/utils'
import { SectionGradient } from '../../components/SectionGradient'
import { useInView } from 'react-intersection-observer'
import { cx } from 'class-variance-authority'
import {
  getHostdLatestDaemonRelease,
  getHostdLatestDesktopRelease,
} from '../../content/releases'
import { CarouselHostd } from '../../components/CarouselHostd'
import { DownloadSection } from '../../components/DownloadSection'
import { backgrounds, previews } from '../../content/assets'
import { SectionTransparent } from '../../components/SectionTransparent'

const title = 'hostd'
const daemon = 'hostd'
const description = (
  <>
    <Code>hostd</Code> is an advanced Sia host solution created by the Sia
    Foundation, designed to enhance the experience for storage providers within
    the Sia network. Tailored for both individual and large-scale storage
    providers, hostd boasts a user-friendly interface and a robust API,
    empowering providers to efficiently manage their storage resources and
    revenue. hostd incorporates an embedded web-UI, simplifying deployment and
    enabling remote management capabilities, ensuring a smooth user experience
    across a diverse range of devices.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Hostd({
  releaseDesktop,
  releaseDaemon,
  technical,
  tutorials,
}: Props) {
  const { ref: appRef, inView: appInView } = useInView()

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.software.hostd}
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
      backgroundImage={backgrounds.waterfall}
      previewImage={previews.hostd}
    >
      <SectionGradient className="pb:30">
        <div className="relative">
          <DownloadSection
            daemon={daemon}
            releaseDaemon={releaseDaemon}
            releaseDesktop={releaseDesktop}
            statusDesktop="beta"
          />
          <div ref={appRef} className="absolute top-[70%]" />
          <div
            className={cx(
              'relative transition-transform',
              appInView ? 'md:scale-[1.03]' : ''
            )}
          >
            <CarouselHostd />
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
          title="Learn more about hostd"
          className="mt-24 md:mt-40 mb-24 md:mb-48"
          size="2"
          background={previews.natePath}
          description={
            <>
              Join the Sia Discord to chat with the team and community about{' '}
              <Code>hostd</Code> development, features, use-cases, bugs, and
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
      getHostdLatestDaemonRelease(),
      getHostdLatestDesktopRelease(),
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
