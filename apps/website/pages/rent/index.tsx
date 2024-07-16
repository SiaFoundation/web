/* eslint-disable react/no-unescaped-entities */
import {
  Callout,
  ContentGallery,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { CalloutRenterd } from '../../components/CalloutRenterd'
import { DownloadSection } from '../../components/DownloadSection'
import { Layout } from '../../components/Layout'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionProjects } from '../../components/SectionProjects'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SectionTutorials } from '../../components/SectionTutorials'
import { routes } from '../../config/routes'
import { getRentingArticles } from '../../content/articles'
import { backgrounds, patterns, previews } from '../../content/assets'
import { getFeedContent } from '../../content/feed'
import { getProjects } from '../../content/projects'
import {
  getRenterdLatestDaemonRelease,
  getRenterdLatestDesktopRelease,
} from '../../content/releases'
import { getStats } from '../../content/stats'
import { getMinutesInSeconds } from '../../lib/time'
import type { AsyncReturnType } from '../../lib/types'

const title = 'Rent'
const description = 'Rent storage space on the Sia network.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Rent({
  technical,
  tutorials,
  thirdParty,
  ideas,
  releaseDaemon,
  releaseDesktop,
}: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.rent.index}
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
      backgroundImage={backgrounds.leaves}
      previewImage={previews.leaves}
    >
      <SectionGradient className="pb-20">
        <DownloadSection
          daemon="renterd"
          releaseDaemon={releaseDaemon}
          releaseDesktop={releaseDesktop}
        />
        <div className="flex flex-col">
          <SiteHeading
            id="core-software"
            size="32"
            title="Core Software"
            description="Official software, developed by the Sia Foundation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalloutRenterd />
            <Callout
              size="1"
              title="Setup guide for renterd"
              background={patterns.bamboo}
              description={
                <>Learn how to rent storage on the Sia network using renterd.</>
              }
              actionTitle="Follow the renterd setup guide"
              actionLink={webLinks.docs.renting}
              actionNewTab
            />
          </div>
          <SiteHeading
            size="32"
            title="Third-party Software"
            description="Third-party software and services, developed by the community."
            className="mt-12 md:mt-24"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionProjects items={thirdParty} />
          </div>
          <SiteHeading
            id="software-ideas"
            size="32"
            title="Renting Software Ideas"
            description="Third-party renting software that the Sia Foundation and community would love to see built."
            className="mt-12 md:mt-24"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionProjects items={ideas} />
          </div>
        </div>
      </SectionGradient>
      <SectionGradient className="pt-12 pb-20">
        <SiteHeading
          id="guides"
          size="32"
          className="pt-0 md:pt-24 pb-10 md:pb-20"
          title="How to store data and media on Sia"
          description={
            <>
              Tutorials on how to get started renting and how to use Sia with
              other common software.
            </>
          }
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
      getRentingArticles(),
      getProjects('renting'),
      getRenterdLatestDaemonRelease(),
      getRenterdLatestDesktopRelease(),
    ])
  const thirdParty = projects.filter((project) => !project.idea)
  const ideas = projects.filter((project) => project.idea)

  const props = {
    technical,
    tutorials,
    thirdParty,
    ideas,
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
