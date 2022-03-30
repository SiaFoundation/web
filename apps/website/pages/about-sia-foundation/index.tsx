import {
  Avatar,
  Box,
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
} from '@siafoundation/design-system'
import { MDXRemote } from 'next-mdx-remote'
import { Layout } from '../../components/Layout'
import { external, sitemap } from '../../config/site'
import { getMdxFile } from '../../lib/mdx'
import { getDaysInSeconds } from '../../lib/time'
import { AsyncReturnType } from '../../lib/types'
import team from '../../content/team'
import { getReports } from '../../content/reports'
import { getNewsPosts } from '../../content/news'
import { getStats } from '../../content/stats'
import { Fragment } from 'react'
import background from '../../assets/backgrounds/tree.png'

const backgroundImage = getImageProps(background)

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Foundation({ stats, foundation, team, newsPosts, reports }: Props) {
  return (
    <Layout
      heading={
        <Section size="4">
          <SiteHeading
            size="64"
            title="The Sia Foundation"
            description={
              <>
                The Foundation maintains, supports, promotes, and conducts
                research for the Sia network.
              </>
            }
          />
        </Section>
      }
      stats={stats}
      backgroundImage={backgroundImage}
    >
      <Section>
        <Flex direction="column" gap="9">
          <Box>
            <SiteHeading size="32" title="Vision" />
            <MDXRemote {...foundation.source} />
          </Box>
          <Flex direction="column" gap="4">
            <SiteHeading size="24" title="Contact" />
            <Flex direction="column" gap="3">
              <Paragraph color="subtle" size="18">
                For developer support please see{' '}
                <NextLink href={external.docs.index} target="_blank">
                  our documentation
                </NextLink>
                .
              </Paragraph>
              <Paragraph color="subtle" size="18">
                For general inquiries email{' '}
                <NextLink href={`mailto:${external.email}`}>
                  info@sia.tech
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
            <Flex key={member.name} gap="2">
              <Avatar
                variant="filter"
                size="3"
                src={`/team/${member.image}.png`}
              />
              <Flex key={member.name} direction="column" gap="1">
                <Text css={{ fontWeight: '600' }}>{member.name}</Text>
                <Text color="subtle">{member.title}</Text>
                <Flex gap="1" align="center">
                  {member.twitter && (
                    <NextLink
                      href={`https://twitter.com/${member.twitter}`}
                      target="_blank"
                      variant="subtle"
                    >
                      <LogoTwitter32 />
                    </NextLink>
                  )}
                  {member.github && (
                    <NextLink
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      variant="subtle"
                    >
                      <LogoGithub24 />
                    </NextLink>
                  )}
                  {member.linkedin && (
                    <NextLink
                      href={`https://www.linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      variant="subtle"
                    >
                      <LogoLinkedin24 />
                    </NextLink>
                  )}
                </Flex>
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
          description={<>Browse the newsroom for recent press releases.</>}
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
  const foundation = await getMdxFile('content/sections/foundation.mdx')
  const newsPosts = await getNewsPosts({
    limit: 3,
    includeHtml: false,
  })
  const reports = await getReports()

  return {
    props: {
      stats,
      foundation,
      team,
      newsPosts,
      reports,
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Foundation
