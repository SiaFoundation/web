/* eslint-disable react/no-unescaped-entities */
import { Fragment } from 'react'
import {
  Link,
  Text,
  ContentGallery,
  Separator,
  SiteHeading,
  getImageProps,
  Paragraph,
  webLinks,
  Callout,
  LogoTwitter24,
  LogoGithub16,
  LogoLinkedin16,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { AsyncReturnType } from '../../lib/types'
import { getCacheReports } from '../../content/reports'
import { getCacheStats } from '../../content/stats'
import { getCacheTeam } from '../../content/team'
import backgroundImage from '../../assets/backgrounds/tree.png'
import previewImage from '../../assets/previews/tree.png'
import { SectionSimple } from '../../components/SectionSimple'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionWaves } from '../../components/SectionWaves'
import { getCacheArticles } from '../../content/articles'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'The Sia Foundation'
const description =
  'The Foundation maintains, supports, promotes, and conducts research for the Sia network.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Foundation({ team, featured, reports }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.foundation.index}
      heading={
        <SectionSimple className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading size="64" title={title} description={description} />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionGradient className="pt-6 md:pt-12 lg:pt-18 pb-16 md:pb-24 lg:pb-40">
        <div className="flex flex-col">
          <SiteHeading size="32" title="Vision" />
          <div className="flex flex-col gap-6">
            <Paragraph>
              Sia began its life as a startup, which means it has always been
              subjected to two competing forces: the ideals of its founders, and
              the profit motive inherent to all businesses. Its founders have
              taken great pains to never compromise on the former, but this
              often threatened the company's financial viability. With the
              establishment of the Sia Foundation, this tension is resolved. The
              Foundation, freed of the obligation to generate profit, is a pure
              embodiment of the ideals from which Sia originally sprung.
            </Paragraph>
            <Paragraph>
              The goals and responsibilities of the Foundation are numerous: to
              maintain core Sia protocols and consensus code; to support
              developers building on top of Sia and its protocols; to promote
              Sia and facilitate partnerships in other spheres and communities;
              to ensure that users can easily acquire and safely store siacoins;
              to develop network scalability solutions; to implement hardforks
              and lead the community through them; and much more. In a broader
              sense, its mission is to commoditize data storage, making it
              cheap, ubiquitous, and accessible to all, without compromising
              privacy or performance.
            </Paragraph>
          </div>
          <div className="flex flex-col">
            <SiteHeading
              size="24"
              title="Contact"
              className="mt-12 md:mt-24 mb-5"
            />
            <div className="flex flex-col gap-8">
              <Paragraph color="subtle" size="18">
                For developer support please see{' '}
                <Link href={webLinks.docs.index} target="_blank">
                  our documentation
                </Link>
                . For general inquiries email{' '}
                <Link href={`mailto:${webLinks.email}`}>info@sia.tech</Link>. If
                you are interested in a career at The Sia Foundation please see
                our{' '}
                <Link href={webLinks.jobs} target="_blank">
                  openings
                </Link>
                .
              </Paragraph>
            </div>
          </div>
        </div>
      </SectionGradient>
      <SectionWaves className="pt-8 md:pt-16 pb-16 md:pb-32">
        <SiteHeading
          className="pb-10 md:pb-20"
          size="32"
          title="The Sia team"
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
          {team.map((member) => (
            <div className="flex flex-col gap-1.5" key={member.name}>
              <Text weight="semibold">{member.name}</Text>
              <Text color="subtle">{member.title}</Text>
              <div className="flex gap-2 items-center">
                {member.twitter && (
                  <Link
                    href={`https://twitter.com/${member.twitter}`}
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <LogoTwitter24 className="scale-90" />
                  </Link>
                )}
                {member.github && (
                  <Link
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <LogoGithub16 />
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    href={`https://www.linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <LogoLinkedin16 />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWaves>
      <SectionGradient className="pt-12 md:pt-32 pb-12 md:pb-40">
        <SiteHeading size="32" title="Quarterly reports" />
        <div className="flex flex-col gap-12">
          {reports.map(([year, yearReports]) => (
            <div className="flex flex-col gap-4" key={year}>
              <Text weight="bold" size="16">
                {year}
              </Text>
              <div className="flex gap-4 items-center">
                {yearReports.map((report, i) => (
                  <Fragment key={report.link}>
                    {i > 0 && i < yearReports.length && (
                      <Separator orientation="vertical" />
                    )}
                    <Link href={report.link} target="_blank" size="16">
                      {report.quarter}
                    </Link>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Callout
          title="Work at the Sia Foundation"
          className="mt-40 md:mt-60"
          size="2"
          description={
            <>
              If you are interested in a career at the Sia Foundation please see
              our openings.
            </>
          }
          actionTitle="View openings"
          actionLink={webLinks.jobs}
          actionNewTab
        />
        <SiteHeading
          size="32"
          className="pt-20 md:pt-40 pb-16 md:pb-20"
          title="Read the latest updates"
          description={
            <>
              Read the latest from the core team and the ecosystem of developers
              building technology on top of Sia.
            </>
          }
          links={[
            {
              title: 'Explore ecosystem news',
              link: routes.newsroom.index,
            },
          ]}
        />
        <ContentGallery
          className="mb-16"
          items={featured}
          columnClassName="grid-cols-1"
        />
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()
  const featured = await getCacheArticles(['sia-all', 'featured'], 5)
  const reports = await getCacheReports()
  const team = await getCacheTeam()

  return {
    props: {
      team,
      featured,
      reports,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}

export default Foundation
