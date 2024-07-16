/* eslint-disable react/no-unescaped-entities */
import {
  Callout,
  ContentGallery,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { CalloutWalletd } from '../../components/CalloutWalletd'
import { Layout } from '../../components/Layout'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionProjects } from '../../components/SectionProjects'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SectionTutorials } from '../../components/SectionTutorials'
import { SoftwareSectionCurrentGen } from '../../components/SoftwareSectionCurrentGen'
import { routes } from '../../config/routes'
import { getWalletArticles } from '../../content/articles'
import { backgrounds, patterns, previews } from '../../content/assets'
import { getFeedContent } from '../../content/feed'
import { getProjects } from '../../content/projects'
import {
  getWalletdLatestDaemonRelease,
  getWalletdLatestDesktopRelease,
} from '../../content/releases'
import { getStats } from '../../content/stats'
import { getMinutesInSeconds } from '../../lib/time'
import type { AsyncReturnType } from '../../lib/types'

const title = 'Wallet'
const description = 'Manage your wallet on the Sia network.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Wallet({
  technical,
  tutorials,
  projects,
  releaseDaemon,
  releaseDesktop,
}: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.wallet.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-32 pb-0">
          <SiteHeading
            anchorLink={false}
            size="64"
            title={title}
            description={description}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.jungle}
      previewImage={previews.jungle}
    >
      <SectionGradient className="pb-20">
        {/* <DownloadBar daemon="walletd" release={release} testnetOnly /> */}
        <div className="flex flex-col">
          <SiteHeading
            size="32"
            title="Core Software"
            description="Official software, developed by the Sia Foundation."
            className="mt-12 md:mt-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalloutWalletd />
            <Callout
              title="Setup guide for walletd"
              background={patterns.nateSnow}
              description={
                <>
                  Learn how to create a Sia wallet and send and receive siacoin
                  with walletd.
                </>
              }
              actionTitle="Follow the walletd setup guide"
              actionLink={webLinks.docs.wallet}
              actionNewTab
            />
            <SoftwareSectionCurrentGen
              versions={{
                sia: {
                  latest: '1.5.9',
                },
              }}
            />
          </div>
          <SiteHeading
            size="32"
            title="Third-party Software"
            description="Third-party software and services, developed by the community."
            className="mt-12 md:mt-24"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionProjects items={projects} />
          </div>
        </div>
      </SectionGradient>
      <SectionGradient className="pt-12 pb-20">
        <SiteHeading
          id="guides"
          size="32"
          className="pt-0 md:pt-24 pb-10 md:pb-20"
          title="Learn how Sia wallets work"
          description={<>Tutorials on how to use a Sia wallet.</>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionTutorials items={tutorials} />
        </div>
        <SiteHeading
          size="32"
          className="pt-32 md:pt-60 pb-10 md:pb-20"
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
          title="Sia 101"
          className="mt-20 md:mt-40 mb-10 md:mb-24"
          size="2"
          background={previews.bamboo}
          description={
            <>
              Learn how the Sia protocol works to power redundant,
              decentralized, data storage.
            </>
          }
          actionTitle="Learn how Sia works"
          actionLink={routes.learn.index}
        />
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const [stats, technical, tutorials, projects, releaseDaemon, releaseDesktop] =
    await Promise.all([
      getStats(),
      getFeedContent(['technical'], 8),
      getWalletArticles(),
      getProjects('wallet'),
      getWalletdLatestDaemonRelease(),
      getWalletdLatestDesktopRelease(),
    ])

  const props = {
    technical,
    tutorials,
    projects,
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
