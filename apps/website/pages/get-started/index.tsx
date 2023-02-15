/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  ContentProject,
  SiteHeading,
  getImageProps,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { getCacheArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getCacheSoftware } from '../../content/software'
import { getCacheStats } from '../../content/stats'
import { getCacheTutorials } from '../../content/tutorials'
import { getCacheVersions } from '../../content/versions'
import backgroundImage from '../../assets/backgrounds/leaves.png'
import previewImage from '../../assets/previews/leaves.png'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionSimple } from '../../components/SectionSimple'
import { SoftwareSectionNextGen } from '../../components/SoftwareSectionNextGen'
import { SoftwareSectionCurrentGen } from '../../components/SoftwareSectionCurrentGen'
import { SoftwareSignAccordion } from '../../components/SoftwareSignAccordion'
import { SoftwareSectionTestnet } from '../../components/SoftwareSectionTestnet'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'Get Started'
const description =
  'Software downloads, tutorials, technical walkthroughs, and more.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function GetStarted({
  technical,
  versions,
  tutorials,
  services,
}: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.getStarted.index}
      heading={
        <SectionSimple className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading size="64" title={title} description={description} />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionGradient className="pt-12 pb-20">
        <div className="flex flex-col">
          <SiteHeading
            size="32"
            title="Core Software"
            description="Binary downloads, documentation, and source code for the latest Sia software."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SoftwareSectionCurrentGen versions={versions} />
          </div>
          <div className="mt-12">
            <SoftwareSignAccordion versions={versions} />
          </div>
          <SiteHeading
            size="32"
            title="Next-Gen Software"
            description="New and improved Sia software, developed by the Sia Foundation."
            className="mt-12 md:mt-24"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SoftwareSectionNextGen />
          </div>
          <SiteHeading
            size="32"
            title="Testnet Software"
            description="Sia software built for the Zen Testnet."
            className="mt-12 md:mt-24"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SoftwareSectionTestnet versions={versions} />
          </div>
        </div>
      </SectionGradient>
      <SectionGradient className="pt-12 pb-20">
        <SiteHeading
          size="32"
          className="pt-0 md:pt-24 pb-10 md:pb-20"
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
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
        <SiteHeading
          size="32"
          className="pt-32 md:pt-60 pb-10 md:pb-20"
          title="Companies and projects building on Sia"
          description={
            <>
              Sia is a thriving ecosystem of data storage enthusiasts, open
              source software, and commercial data storage platforms.
            </>
          }
          links={[
            {
              title: 'Learn about the ecosystem',
              link: routes.community.index,
            },
          ]}
        />
        <ContentGallery component={ContentProject} items={services} />
        <Callout
          title="Sia 101"
          className="mt-20 md:mt-40 mb-10 md:mb-24"
          size="2"
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
  const stats = await getCacheStats()
  const technical = await getCacheArticles(['technical'], 8)
  const versions = await getCacheVersions()
  const tutorials = await getCacheTutorials()
  const services = await getCacheSoftware('storage_services', 5)

  const props = {
    technical,
    versions,
    tutorials,
    services,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
