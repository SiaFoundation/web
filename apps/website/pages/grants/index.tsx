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
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getArticles } from '../../content/articles'
import { getSoftware } from '../../content/software'
import { AsyncReturnType } from '../../lib/types'
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
    The Sia Foundation welcomes and supports contributors from all over the
    world to come and build on Sia. The goal of the Foundation's grant program
    is to fund research, development, developer tools, and anything else that
    will support and further the mission of user-owned data while enriching the
    Sia ecosystem.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

function CommunityEcosystem({ blogs }: Props) {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.community.index}
      heading={
        <Section size="4">
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
      <Section css={{ maxWidth: '800px' }} gap="9">
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
                      The Grant Committee convenes bi-weekly to review the
                      following:
                      <Ol css={{ marginTop: '$3' }}>
                        <Li size="14" index={1}>
                          New proposals, to accept, reject, or request more
                          info.
                        </Li>
                        <Li size="14" index={2}>
                          Existing grants, to assess their progress.
                        </Li>
                        <Li size="14" index={3}>
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
                    <Li size="14">Mission of user-owned data</Li>
                    <Li size="14">Network adoption</Li>
                    <Li size="14">Decentralization</Li>
                    <Li size="14">Community impact</Li>
                  </Ol>
                </>
              ),
            },
          ]}
        />
      </Section>
      <Section size="3">
        <SiteHeading
          size="32"
          title="Interested in a grant but have questions?"
          description={
            <>
              Come chat with Kino, Frances, and committee members who are
              currently building out the program in the{' '}
              <Code>#grants-program</Code> Discord channel. This channel
              provides a space to ask questions, discuss grants, share ideas,
              provide feedback, and collaborate with community members.
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
      <Section size="4">
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
      <Section size="3">
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
  const blogs = getArticles(['ecosystem-featured'], 4)

  return {
    props: {
      blogs,
      fallback: {
        '/api/stats': stats,
      },
    },
  }
}

export default CommunityEcosystem
