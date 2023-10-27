/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
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
import { getHostingArticles } from '../../content/articles'
import { SectionGradient } from '../../components/SectionGradient'
import { backgrounds, patterns, previews } from '../../content/assets'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SectionProjects } from '../../components/SectionProjects'
import { CalloutHostd } from '../../components/CalloutHostd'
import { SectionTutorials } from '../../components/SectionTutorials'
import { getHostdLatestRelease } from '../../content/releases'

const title = 'Host'
const description = 'Offer your storage space on the Sia network.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Host({
  technical,
  tutorials,
  thirdParty,
  ideas,
  release,
}: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.rent.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-12">
          <SiteHeading
            anchorLink={false}
            size="64"
            title={title}
            description={description}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateWaterfall}
      previewImage={previews.nateWaterfall}
    >
      <SectionGradient className="pb-20">
        <div className="flex flex-col">
          <SiteHeading
            size="32"
            title="Core Software"
            description="Official software, developed by the Sia Foundation."
            className="mt-12 md:mt-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalloutHostd release={release} />
            <Callout
              title="Setup guide for hostd"
              background={patterns.bamboo}
              description={
                <>
                  Learn how to become a host and offer storage on the Sia
                  network using hostd.
                </>
              }
              actionTitle="Follow the setup guide"
              actionLink={webLinks.docs.hosting}
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
            title="Hosting Software Ideas"
            description="Third-party hosting software that the Sia Foundation and community would love to see built."
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
          title="How to set up your host"
          description={
            <>
              Tutorials on how to get started hosting and how to use Sia with
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
          actionTitle="Learn more"
          actionLink={routes.learn.index}
        />
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const [stats, technical, tutorials, projects, release] = await Promise.all([
    getStats(),
    getFeedContent(['technical'], 8),
    getHostingArticles(),
    getProjects('hosting'),
    getHostdLatestRelease(),
  ])
  const thirdParty = projects.filter((project) => !project.idea)
  const ideas = projects.filter((project) => project.idea)

  const props = {
    technical,
    tutorials,
    thirdParty,
    ideas,
    release,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
