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
import { getCacheArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getCacheProjects } from '../../content/projects'
import { getCacheStats } from '../../content/stats'
import { getCacheTutorials } from '../../content/tutorials'
import { textContent } from '../../lib/utils'
import { SectionGradient } from '../../components/SectionGradient'
import { useInView } from 'react-intersection-observer'
import { cx } from 'class-variance-authority'
import { getCacheWalletdLatestRelease } from '../../content/releases'
import { DownloadWidgetLarge } from '../../components/DownloadWidgetLarge'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { SectionTransparent } from '../../components/SectionTransparent'
import { CarouselWalletd } from '../../components/CarouselWalletd'

const title = 'walletd'
const daemon = 'walletd'
const description = (
  <>
    <Code>walletd</Code> is a watch-only wallet server. It does not have access
    to any private keys, only addresses derived from those keys. Its role is to
    watch the blockchain for events relevant to particular addresses. The server
    therefore knows which outputs are spendable by the wallet at any given time,
    and can assist in constructing and broadcasting transactions spending those
    outputs. However, signing transactions is the sole responsibility of the
    client.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Walletd({ version, technical, tutorials }: Props) {
  const downloadEl = <DownloadWidgetLarge daemon={daemon} version={version} />
  const { ref: appRef, inView: appInView } = useInView()

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.software.walletd}
      heading={
        <SectionTransparent className="pt-24 pb-0 md:pt-32 md:pb-0">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
          />
          <div className="block xl:hidden pt-32 pb-4">{downloadEl}</div>
        </SectionTransparent>
      }
      backgroundImage={backgrounds.bamboo}
      previewImage={previews.walletd}
    >
      <SectionGradient className="pt-8 xl:pt-6 pb:30">
        <div className="relative">
          <div ref={appRef} className="absolute top-[70%]" />
          <div
            className={cx(
              'relative transition-transform',
              appInView ? 'scale-[1.03]' : ''
            )}
          >
            <div className="hidden xl:block pt-52 pb-2">{downloadEl}</div>
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
          background={backgrounds.natePath}
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
  const stats = await getCacheStats()
  const technical = await getCacheArticles(['technical'], 8)
  const tutorials = await getCacheTutorials()
  const release = await getCacheWalletdLatestRelease()
  const services = await getCacheProjects('storage_services', 5)

  const props = {
    technical,
    tutorials,
    services,
    version: release?.tag_name || null,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
