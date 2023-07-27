/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  SiteHeading,
  webLinks,
  Link,
  Ol,
  Li,
  Code,
  Text,
  Paragraph,
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
import { getNotionPage } from '../../lib/notion'

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
  grantCommittee,
  grantApplicantFaqSource,
  grantGranteeFaqSource,
}: Props) {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.community.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
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
                  href: '#create-a-proposal',
                  title: 'Create a proposal',
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
                  href: '#more-questions',
                  title: 'More questions?',
                },
              ]}
              className="mt-10"
            />
            <div className="flex flex-col gap-3 mt-10"></div>
          </SiteHeading>
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateSnow}
      previewImage={previews.nateSnow}
    >
      <SectionGradient className="pt-6 md:pt-20 pb-16 md:pb-32">
        <div className="flex flex-col max-w-3xl overflow-hidden">
          <SiteHeading
            size="32"
            className="pb-16 md:pb-20"
            title="The Grant Process"
            description={
              <>
                The following section outlines the proposal requirements, the
                proposal process, and evaluation criteria for the Sia grant
                program. Read on to get started on your own grant application.
              </>
            }
          />
          <ContentGallery
            columnClassName="grid-cols-1"
            className="gap-y-12 md:gap-y-20"
            items={[
              {
                title: 'Proposal Requirements',
                icon: 'ListChecked',
                children: (
                  <Ol className="mt-5 -ml-10 md:ml-0 gap-2">
                    <Li index={1}>
                      Name of organization or individual and project name.
                    </Li>
                    <Li index={2}>
                      Purpose of the grant: who benefits and how the project
                      will serve the Foundation’s mission of user-owned data.
                    </Li>
                    <Li index={3}>Code contributions must be open source.</Li>
                    <Li index={4}>
                      Timeline with measurable objectives and goals.
                    </Li>
                    <Li index={5}>
                      Any potential risks that will affect the outcome of the
                      project.
                    </Li>
                    <Li index={6}>Budget and justification.</Li>
                    <Li index={7}>
                      Reporting requirements: Progress reports to the
                      foundation/committee and to the community.
                    </Li>
                  </Ol>
                ),
              },
              {
                title: 'Proposal Process',
                icon: 'MailAll',
                children: (
                  <Ol className="mt-5 -ml-10 md:ml-0 gap-2">
                    <Li index={1}>
                      Create a proposal with the above requirements in mind.
                    </Li>
                    <Li index={2}>
                      Submit your proposal at{' '}
                      <Link href={webLinks.forumGrants} target="_blank">
                        {webLinks.forumGrants}
                      </Link>
                      .
                    </Li>
                    <Li index={3}>
                      Open discussion will ensue in the comment section from the
                      community.
                    </Li>
                    <Li
                      index={4}
                      subList={
                        <Ol className="mt-3 gap-1">
                          <Li>
                            New proposals, to accept, reject, or request more
                            info.
                          </Li>
                          <Li>Existing grants, to assess their progress.</Li>
                          <Li>
                            Newly completed grants, to review their outcomes.
                          </Li>
                        </Ol>
                      }
                    >
                      The Grant Committee convenes every two weeks to review the
                      following:
                    </Li>
                  </Ol>
                ),
              },
              {
                title: 'Scoring Rubric',
                icon: 'TestTool',
                children: (
                  <div className="mt-3 -ml-10 md:ml-0">
                    <Paragraph size="16">
                      All proposals are reviewed by the Grant Committee. When
                      evaluating a grant proposal, the Committee considers the
                      following factors while utilizing a scoring matrix to
                      ensure a thorough vetting process.
                    </Paragraph>
                    <Ol className="mt-6 gap-2">
                      <Li index={1}>
                        <Text weight="semibold">
                          In line with Foundation’s mission:
                        </Text>{' '}
                        Does the proposal address a recognized need in the
                        decentralized cloud storage community? Is the need
                        consistent with The Sia Foundation’s mission of
                        user-owned data?
                      </Li>
                      <Li index={2}>
                        <Text weight="semibold">Community Impact:</Text> Will
                        the project provide a meaningful volume of services
                        and/or people served in the decentralized cloud storage
                        community (in particular the Sia community)?
                      </Li>
                      <Li index={3}>
                        <Text weight="semibold">
                          Goals, Objectives & Outcome:
                        </Text>{' '}
                        Are there clear goals and objectives written? Are
                        measurable outcomes evident?
                      </Li>
                      <Li index={4}>
                        <Text weight="semibold">Deliverable:</Text> How well
                        does the individual/organization demonstrate the ability
                        to deliver and measure proposed outcomes?
                      </Li>
                      <Li index={5}>
                        <Text weight="semibold">
                          Risks and Technical Feasibility:
                        </Text>{' '}
                        Is the risk reasonable for the timeline provided? Please
                        be thoughtful if the risk is high enough to impact the
                        outcome of the project.
                      </Li>
                      <Li index={6}>
                        <Text weight="semibold">Budget Justification:</Text> How
                        well does the applicant justify the budget?
                      </Li>
                    </Ol>
                  </div>
                ),
              },
              {
                title: 'Grant Committee',
                icon: 'EventsAlt',
                children: (
                  <Ol className="mt-5 -ml-10 md:ml-0 gap-2">
                    {grantCommittee.map(({ name }) => (
                      <Li key={name}>{name}</Li>
                    ))}
                  </Ol>
                ),
              },
            ]}
          />
        </div>
      </SectionGradient>
      <SectionGradient>
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
              title: 'Learn more about the ecosystem',
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
        <Callout
          id="create-a-proposal"
          className="mt-20 md:mt-48 mb-16 md:mb-24"
          title="Get started on your grant proposal"
          size="2"
          background={previews.tree}
          description={
            <>
              The Sia Foundation looks forward to funding your open source
              research and development projects.
            </>
          }
          actionTitle="Create a proposal"
          actionLink={webLinks.forumGrants}
          actionNewTab
        />
      </SectionGradient>
      <SectionGradient>
        <div className="mb-20 md:mb-32">
          <MDXRemote {...grantApplicantFaqSource} components={components} />
        </div>
        <MDXRemote {...grantGranteeFaqSource} components={components} />
        <SiteHeading
          id="more-questions"
          size="32"
          className="pt-32 md:pt-60 mb-32 md:pb-32"
          title="Interested, but have more questions?"
          description={
            <>
              If you’re interested but have questions or need help submitting
              your grant feel free to join the discord server and hop in the{' '}
              <Code>#grants-program</Code> channel to chat with Kino, Frances,
              and the committee members. This channel provides a space to ask
              questions, discuss the grant program, share ideas, provide
              feedback, and collaborate with community members.
            </>
          }
          links={[
            {
              title: 'Join the Discord',
              link: webLinks.discord,
              newTab: true,
            },
          ]}
        />
      </SectionGradient>
    </Layout>
  )
}

const grantApplicantFaqId = 'f6971439deae401294d59f62046f88b8'
const approvedGranteeFaqId = '89b7ca138da74872a20be9e533d272c7'

export async function getStaticProps() {
  const stats = await getStats()
  const grantIdeas = await getProjects('grant_ideas', 6)
  const grantExamples = await getProjects('grant_examples', 6)
  const grantCommittee = await getGrantCommittee()

  const { source: grantApplicantFaqSource } = await getNotionPage(
    grantApplicantFaqId
  )
  const { source: grantGranteeFaqSource } = await getNotionPage(
    approvedGranteeFaqId
  )

  return {
    props: {
      grantExamples,
      grantIdeas,
      grantCommittee,
      grantApplicantFaqSource,
      grantGranteeFaqSource,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
