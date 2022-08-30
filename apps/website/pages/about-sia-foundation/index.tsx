/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Grid,
  NextLink,
  Text,
  ContentGallery,
  LogoGithub24,
  LogoLinkedin24,
  LogoTwitter32,
  Section,
  WavesBackdrop,
  Separator,
  SiteHeading,
  getImageProps,
  Paragraph,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { getDaysInSeconds } from '../../lib/time'
import { AsyncReturnType } from '../../lib/types'
import team from '../../content/team'
import { getReports } from '../../content/reports'
import { getNewsPosts } from '../../content/news'
import { getStats } from '../../content/stats'
import { Fragment } from 'react'
import backgroundImage from '../../assets/backgrounds/tree.png'
import previewImage from '../../assets/previews/tree.png'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'The Sia Foundation'
const description =
  'The Foundation maintains, supports, promotes, and conducts research for the Sia network.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Foundation({ team, newsPosts, reports }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={sitemap.foundation.index}
      heading={
        <Section size="4">
          <SiteHeading size="64" title={title} description={description} />
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section>
        <Flex direction="column" gap="9">
          <Flex direction="column" gap="2">
            <SiteHeading size="32" title="Vision" />
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
          </Flex>
          <Flex direction="column" gap="4">
            <SiteHeading size="24" title="Contact" />
            <Flex direction="column" gap="3">
              <Paragraph color="subtle" size="18">
                For developer support please see{' '}
                <NextLink href={webLinks.docs.index} target="_blank">
                  our documentation
                </NextLink>
                . For general inquiries email{' '}
                <NextLink href={`mailto:${webLinks.email}`}>
                  info@sia.tech
                </NextLink>
                .
              </Paragraph>
              <Paragraph color="subtle" size="18">
                If you are interested in a career at The Sia Foundation please
                see our{' '}
                <NextLink href={webLinks.jobs} target="_blank">
                  openings
                </NextLink>
                .
              </Paragraph>
            </Flex>
          </Flex>
        </Flex>
      </Section>
      <Section size="3">
        <SiteHeading size="32" title="The Sia Team" />
        <Grid
          columns={{
            '@initial': '1',
            '@bp1': '2',
            '@bp2': '3',
          }}
          gapX="3"
          gapY="6"
        >
          {team.map((member) => (
            <Flex key={member.name} direction="column" gap="1">
              <Text css={{ fontWeight: '600' }}>{member.name}</Text>
              <Text color="subtle">{member.title}</Text>
              <Flex gap="1" align="center">
                {member.twitter && (
                  <NextLink
                    href={`https://twitter.com/${member.twitter}`}
                    target="_blank"
                    variant="subtle"
                    aria-label="Twitter"
                  >
                    <LogoTwitter32 />
                  </NextLink>
                )}
                {member.github && (
                  <NextLink
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    variant="subtle"
                    aria-label="GitHub"
                  >
                    <LogoGithub24 />
                  </NextLink>
                )}
                {member.linkedin && (
                  <NextLink
                    href={`https://www.linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    variant="subtle"
                    aria-label="LinkedIn"
                  >
                    <LogoLinkedin24 />
                  </NextLink>
                )}
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Section>
      <Section width="flush">
        <Section width="flush" css={{ position: 'relative' }}>
          <WavesBackdrop />
          <Section>
            <SiteHeading size="32" title="Quarterly Reports" />
            <Flex direction="column" gap="6">
              {reports.map(([year, yearReports]) => (
                <Flex key={year} direction="column" gap="2">
                  <Text weight="bold" size="16">
                    {year}
                  </Text>
                  <Flex gap="2" align="center">
                    {yearReports.map((report, i) => (
                      <Fragment key={report.link}>
                        {i > 0 && i < yearReports.length && (
                          <Separator orientation="vertical" />
                        )}
                        <Text size="16">
                          <NextLink
                            href={report.link}
                            target="_blank"
                            variant="subtle"
                          >
                            {report.quarter}
                          </NextLink>
                        </Text>
                      </Fragment>
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Section>
        </Section>
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Recent News"
          description={
            <>
              Browse the newsroom for recent press releases and updates from the
              ecosystem.
            </>
          }
          links={[
            {
              title: 'Explore the newsroom',
              link: sitemap.newsroom.index,
            },
          ]}
        />
        <ContentGallery columns="1" items={newsPosts} />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const newsPosts = await getNewsPosts({
    limit: 3,
  })
  const reports = getReports()

  return {
    props: {
      team,
      newsPosts,
      reports,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Foundation
