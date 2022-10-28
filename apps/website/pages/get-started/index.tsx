/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Grid,
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
import { NextGenSoftware } from '../../components/NextGenSoftware'
import { CurrentGenSoftware } from '../../components/CurrentGenSoftware'
import { SoftwareSignAccordion } from '../../components/SoftwareSignAccordion'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'Get Started'
const description =
  'Software downloads, tutorials, technical walkthroughs, and more.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function GetStarted({ technical, versions, tutorials, services }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.getStarted.index}
      heading={
        <SectionSimple css={{ py: '$max' }}>
          <SiteHeading size="64" title={title} description={description} />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionGradient
        css={{
          pt: '$9',
          pb: '$12',
        }}
      >
        <Flex direction="column" gap="9">
          <SiteHeading size="32" title="Core Software">
            <SoftwareSignAccordion versions={versions} />
          </SiteHeading>
          <Grid
            columns={{
              '@initial': '1',
              '@bp2': '2',
            }}
            gap="5"
          >
            <CurrentGenSoftware versions={versions} />
          </Grid>
          <SiteHeading
            size="32"
            title="Next-Gen Software"
            description="New and improved Sia software, developed by the Sia Foundation."
            css={{ mt: '$9' }}
          />
          <Grid
            columns={{
              '@initial': '1',
              '@bp2': '2',
            }}
            gap="5"
          >
            <NextGenSoftware />
          </Grid>
        </Flex>
      </SectionGradient>
      <SectionGradient css={{ py: '$12' }}>
        <SiteHeading
          size="32"
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          css={{ mt: '$9' }}
          title="Learn about the technology behind Sia"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columns="1" items={technical} />
        <SiteHeading
          size="32"
          css={{ mt: '$9' }}
          title="Companies and projects building on Sia"
          description={
            <>
              Sia is a thriving ecosystem of open source software, layer 2
              networks, and commercial data storage platforms.
            </>
          }
          links={[
            {
              title: 'Learn about the ecosystem',
              link: routes.community.index,
            },
          ]}
        />
        <ContentGallery
          component={ContentProject}
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 3,
          }}
          items={services}
        />
        <Callout
          title="Sia 101"
          css={{ my: '$9' }}
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

export default GetStarted
