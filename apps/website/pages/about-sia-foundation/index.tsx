import {
  Avatar,
  Box,
  Flex,
  Grid,
  NLink,
  Paragraph,
  Separator,
  Text,
  ContentGallery,
  ContentBlock,
  LogoGithub16,
  LogoTwitter16,
} from '@siafoundation/design-system'
import { MDXRemote } from 'next-mdx-remote'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { getMdxFile } from '../../lib/mdx'
import { getDaysInSeconds } from '../../lib/time'
import { AsyncReturnType } from '../../lib/types'
import team from '../../content/team'
import transparency from '../../content/transparency'
import { getNewsPosts } from '../../content/news'
import { getStats } from '../../content/stats'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Foundation({ stats, foundation, team, newsPosts }: Props) {
  return (
    <Layout stats={stats}>
      <ContentBlock
        title="The Sia Foundation"
        description={`
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            necessitatibus. Cumque fugiat, itaque repellendus corrupti quos
            aperiam dolorum quibusdam.
      `}
      />
      <Flex
        gap="4"
        wrap={{
          '@initial': 'wrap',
          '@bp3': 'noWrap',
        }}
      >
        <Box css={{ '@bp3': { flex: 2 } }}>
          <ContentBlock title="Vision">
            <MDXRemote {...foundation.source} />
          </ContentBlock>
        </Box>
        <Box css={{ '@bp3': { flex: 1 } }}>
          <ContentBlock
            title="Ethos"
            description={`
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              necessitatibus. Cumque fugiat, itaque repellendus corrupti quos
              aperiam dolorum quibusdam.
          `}
          />
        </Box>
      </Flex>
      <ContentBlock
        title="Contact"
        description={`
          For developer support please see our support docs. For general
          inquiries email info@sia.tech.
      `}
      />
      <Separator size="4" />
      <ContentBlock title="Team">
        <Grid
          columns={{
            '@initial': '1',
            '@bp2': '2',
            '@bp4': '3',
          }}
          gapX="3"
          gapY="5"
        >
          {team.map((member) => (
            <Flex key={member.name} direction="column" gap="2">
              <Avatar size="5" />
              <Text>{member.name}</Text>
              <Flex gap="1">
                <Text color="subtle">{member.title}</Text>
                {member.twitter && (
                  <NLink
                    href={`https://twitter.com/${member.twitter}`}
                    target="_blank"
                    css={{ color: '$gray9' }}
                  >
                    <LogoTwitter16 />
                  </NLink>
                )}
                {member.github && (
                  <NLink
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    css={{ color: '$gray9' }}
                  >
                    <LogoGithub16 />
                  </NLink>
                )}
              </Flex>
              <Paragraph size="1">{member.description}</Paragraph>
            </Flex>
          ))}
        </Grid>
      </ContentBlock>
      <Separator size="4" />
      <ContentBlock title="Quarterly reports">
        {transparency.map((report) => (
          <Box key={report.link}>
            <Text size="4">
              <NLink href={report.link} target="_blank" variant="subtle">
                {report.name}
              </NLink>
            </Text>
          </Box>
        ))}
      </ContentBlock>
      <Separator size="4" />
      <ContentGallery
        title="Recent News"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officiis!
        `}
        links={[
          {
            title: 'Explore the newsroom',
            link: sitemap.newsroom.index,
          },
        ]}
        items={newsPosts}
      />
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

  return {
    props: {
      stats,
      foundation,
      team,
      newsPosts,
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Foundation
