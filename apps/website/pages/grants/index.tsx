/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getProjects } from '../../content/projects'
import { getStats } from '../../content/stats'
import { textContent } from '../../lib/utils'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { getGrantCommittee } from '../../content/grantCommittee'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SectionGradient } from '../../components/SectionGradient'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { TableOfContents } from '../../components/TableOfContents'
import { backgrounds, previews } from '../../content/assets'
import { CalloutProject } from '../../components/CalloutProject'
import { getNotionPage } from '@siafoundation/data-sources'

const title = 'Grants'
const description = (
  <>
    The Sia Foundation welcomes contributors from all over the world to come and
    build on Sia through our Grants program. Our goal for this program is to
    fund research, development, developer tools, and anything else that will
    support and further our mission of user-owned data while enriching the Sia
    ecosystem.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Grants({
  grantExamples,
  grantIdeas,
  grantsOverviewSource,
  grantsDetailsSource,
}: Props) {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.community.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6">
          <SiteHeading
            title={title}
            description={description}
            size="64"
            anchorLink={false}
          >
            <TableOfContents
              items={[
                {
                  href: '#the-grant-process',
                  title: 'The grant process',
                },
                {
                  href: '#ideas',
                  title: 'Browse grant ideas',
                },
                {
                  href: '#example-projects',
                  title: 'Browse example projects',
                },
                {
                  href: webLinks.forumGrants,
                  target: '_blank',
                  title: 'Browse current proposals',
                },
                {
                  href: '#grant-guidelines',
                  title: 'Grant guidelines',
                },
                {
                  href: '#proposal-formats',
                  title: 'Proposal formats',
                },
                {
                  href: '#grant-applicant-faq',
                  title: 'Grant applicant FAQ',
                },
                {
                  href: '#approved-grantee-faq',
                  title: 'Approved grantee FAQ',
                },
                {
                  href: '#create-a-proposal',
                  title: 'Create a proposal',
                },
              ]}
              className="mt-10"
            />
          </SiteHeading>
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateSnow}
      previewImage={previews.nateSnow}
    >
      <SectionGradient className="pt-6 md:pt-10 pb-16 md:pb-32">
        <MDXRemote {...grantsOverviewSource} components={components} />
        <SiteHeading
          id="ideas"
          size="32"
          className="pt-16 md:pt-40 pb-10 md:pb-20"
          title="We would love to see the following ideas as Grant projects"
          description={
            <>
              The Sia community would love to see the following projects built.
              If you are interested in building one of these projects, please
              reach out to the community on Discord to discuss your proposal.
            </>
          }
        />
        <ContentGallery
          items={grantIdeas.map((i) => ({
            ...i,
            newTab: true,
          }))}
          component={CalloutProject}
          columnClassName="grid-cols-1 md:grid-cols-2"
          gapClassName="gap-4 sm:gap-5"
        />
        <SiteHeading
          id="example-projects"
          size="32"
          className="pt-16 md:pt-40 pb-10 md:pb-20"
          title="Check out what people are building on Sia"
          description={
            <>
              Sia is a thriving ecosystem of data storage enthusiasts, open
              source software, and commercial data storage platforms. Apply for
              a Sia grant and start contributing.
            </>
          }
          links={[
            {
              title: 'Browse all ecosystem projects',
              link: routes.community.index,
            },
          ]}
        />
        <ContentGallery
          items={grantExamples.map((i) => ({
            ...i,
            newTab: true,
          }))}
          component={CalloutProject}
          columnClassName="grid-cols-1 md:grid-cols-2"
          gapClassName="gap-4 sm:gap-5"
        />
      </SectionGradient>
      <SectionGradient>
        <MDXRemote {...grantsDetailsSource} components={components} />
        <div className="pt-20 md:pt-48 pb-16 md:pb-40">
          <Callout
            id="create-a-proposal"
            title="Get started on your grant proposal"
            size="2"
            background={previews.tree}
            description={
              <>
                The Sia Foundation looks forward to funding your open source
                research and development projects.
              </>
            }
            actionTitle="Create a Sia grant proposal"
            actionLink={webLinks.forumGrantsProposed}
            actionNewTab
          />
        </div>
      </SectionGradient>
    </Layout>
  )
}

const grantsOverviewId = 'bc9f65e5ca444e18831fbf89a54e7ee4'
const grantsDetailsId = '9556470dcfcd4e0ca338b842bc13ec1d'

export async function getStaticProps() {
  const stats = await getStats()
  const grantIdeas = await getProjects('grant_ideas', 6)
  const grantExamples = await getProjects('grant_examples', 6)
  const grantCommittee = await getGrantCommittee()

  const { source: grantsOverviewSource } = await getNotionPage(grantsOverviewId)
  const { source: grantsDetailsSource } = await getNotionPage(grantsDetailsId)

  return {
    props: {
      grantsOverviewSource,
      grantExamples,
      grantIdeas,
      grantCommittee,
      grantsDetailsSource,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
