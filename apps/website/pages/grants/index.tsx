/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  Section,
  SiteHeading,
  getImageProps,
  ListChecked24,
  MailAll24,
  TestToolIcon,
  webLinks,
  ContentProject,
  NextLink,
  Ol,
  Li,
  Code,
  Text,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getSoftware } from '../../content/software'
import { getStats } from '../../content/stats'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/nate-snow.png'
import previewImage from '../../assets/previews/nate-snow.png'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const services = getSoftware('open_source_software', 6)

const title = 'Grants'
const description = (
  <>
    We’re excited to announce the launch of the Sia Foundation’s Grants Program!
    We welcome and support contributors from all over the world to come and
    build on Sia. Our goal for this program is to fund research, development,
    developer tools, and anything else that will support and further our mission
    of user-owned data while enriching the Sia ecosystem.
  </>
)

export default function Grants() {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.community.index}
      heading={
        <Section py="4">
          <SiteHeading
            title={title}
            description={description}
            size="64"
            links={[
              {
                title: 'Join our Discord',
                link: webLinks.discord,
                newTab: true,
              },
              {
                title: 'Browse Proposals',
                link: webLinks.forumGrants,
                newTab: true,
              },
            ]}
          />
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section py="4" css={{ maxWidth: '800px' }} gap="7">
        <SiteHeading
          size="32"
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
          columns="1"
          gap="7"
          items={[
            {
              title: 'Proposal requirements',
              icon: <ListChecked24 />,
              subtitle: (
                <>
                  <Ol>
                    <Li size="14" index={1}>
                      Name of organization or individual and project name.
                    </Li>
                    <Li size="14" index={2}>
                      Purpose of the grant: who benefits and how the project
                      will serve the Foundation’s mission of user-owned data.
                    </Li>
                    <Li size="14" index={3}>
                      Code contributions must be open source.
                    </Li>
                    <Li size="14" index={4}>
                      Timeline with measurable objectives and goals.
                    </Li>
                    <Li size="14" index={5}>
                      Any potential risks that will affect the outcome of the
                      project.
                    </Li>
                    <Li size="14" index={6}>
                      Budget and justification.
                    </Li>
                    <Li size="14" index={7}>
                      Reporting requirements: Progress reports to the
                      foundation/committee and to the community.
                    </Li>
                  </Ol>
                </>
              ),
            },
            {
              title: 'Proposal process',
              icon: <MailAll24 />,
              subtitle: (
                <>
                  <Ol>
                    <Li size="14" index={1}>
                      Create a proposal with the above requirements in mind.
                    </Li>
                    <Li size="14" index={2}>
                      Submit your proposal at{' '}
                      <NextLink href={webLinks.forumGrants} target="_blank">
                        {webLinks.forumGrants}
                      </NextLink>
                      .
                    </Li>
                    <Li size="14" index={3}>
                      Open discussion will ensue in the comment section from the
                      community.
                    </Li>
                    <Li size="14" index={4}>
                      The Grant Committee convenes every two weeks to review the
                      following:
                      <Ol css={{ marginTop: '$3' }}>
                        <Li size="14">
                          New proposals, to accept, reject, or request more
                          info.
                        </Li>
                        <Li size="14">
                          Existing grants, to assess their progress.
                        </Li>
                        <Li size="14">
                          Newly completed grants, to review their outcomes.
                        </Li>
                      </Ol>
                    </Li>
                  </Ol>
                </>
              ),
            },
            {
              title: 'Scoring rubric',
              icon: <TestToolIcon size={24} />,
              subtitle: (
                <>
                  All proposals are reviewed by the Grant Committee. When
                  evaluating a grant proposal, the Committee considers the
                  following factors while utilizing a scoring matrix to ensure a
                  thorough vetting process.
                  <Ol css={{ marginTop: '$4' }}>
                    <Li size="14" index={1}>
                      <Text weight="semibold">
                        In line with Foundation’s mission:
                      </Text>{' '}
                      Does the proposal address a recognized need in the
                      decentralized cloud storage community? Is the need
                      consistent with The Sia Foundation’s mission of user-owned
                      data?
                    </Li>
                    <Li size="14" index={2}>
                      <Text weight="semibold">Community Impact:</Text> Will the
                      project provide a meaningful volume of services and/or
                      people served in the decentralized cloud storage community
                      (in particular the Sia community)?
                    </Li>
                    <Li size="14" index={3}>
                      <Text weight="semibold">
                        Goals, Objectives & Outcome:
                      </Text>{' '}
                      Are there clear goals and objectives written? Are
                      measurable outcomes evident?
                    </Li>
                    <Li size="14" index={4}>
                      <Text weight="semibold">Deliverable:</Text> How well does
                      the individual/organization demonstrate the ability to
                      deliver and measure proposed outcomes?
                    </Li>
                    <Li size="14" index={5}>
                      <Text weight="semibold">Risks:</Text> Is the risk
                      reasonable for the timeline provided? Please be thoughtful
                      if the risk is high enough to impact the outcome of the
                      project.
                    </Li>
                    <Li size="14" index={6}>
                      <Text weight="semibold">Budget Justification:</Text> How
                      well does the applicant justify the budget?
                    </Li>
                  </Ol>
                </>
              ),
            },
          ]}
        />
      </Section>
      <Section py="3">
        <SiteHeading
          size="32"
          title="Interested in a grant but have questions?"
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
      </Section>
      <Section py="4">
        <SiteHeading
          size="32"
          title="Check out what people are building on Sia"
          description={
            <>
              Sia is a thriving ecosystem of open source software, layer 2
              networks, and commercial data storage platforms. Apply for a Sia
              grant and start contributing.
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
          items={services.map((i) => ({
            ...i,
            newTab: true,
          }))}
          component={ContentProject}
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 3,
          }}
        />
      </Section>
      <Section pt="2" pb="4">
        <Callout
          title="Get started on your grant proposal"
          size="2"
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
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  return {
    props: {
      fallback: {
        '/api/stats': stats,
      },
    },
  }
}
