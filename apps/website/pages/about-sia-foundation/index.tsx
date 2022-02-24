import {
  Avatar,
  Box,
  Flex,
  Grid,
  NLink,
  Paragraph,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { SimpleBlock } from '../../components/SimpleBlock'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { getMdxFile } from '../../lib/mdx'
import { getDaysInSeconds } from '../../lib/time'
import { MDXRemote } from 'next-mdx-remote'
import { AsyncReturnType } from '../../lib/types'
import team from '../../content/team'
import transparency from '../../content/transparency'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { getNewsPosts } from '../../content/news'
import { ContentBlock } from '../../components/ContentBlock'
import { ContentGallery } from '../../components/ContentGallery'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Foundation({ foundation, team, newsPosts }: Props) {
  return (
    <Layout>
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
          <SimpleBlock title="Vision">
            <MDXRemote {...foundation.content} />
          </SimpleBlock>
        </Box>
        <Box css={{ '@bp3': { flex: 1 } }}>
          <SimpleBlock title="Ethos">
            <Paragraph size="1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              necessitatibus. Cumque fugiat, itaque repellendus corrupti quos
              aperiam dolorum quibusdam.
            </Paragraph>
          </SimpleBlock>
        </Box>
      </Flex>
      <SimpleBlock title="Contact">
        <Text>
          For developer support please see our support docs. For general
          inquiries email info@sia.tech.
        </Text>
      </SimpleBlock>
      <Separator size="4" />
      <SimpleBlock title="Team">
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
                    <TwitterLogoIcon />
                  </NLink>
                )}
                {member.github && (
                  <NLink
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    css={{ color: '$gray9' }}
                  >
                    <GitHubLogoIcon />
                  </NLink>
                )}
              </Flex>
              <Paragraph size="1">{member.description}</Paragraph>
            </Flex>
          ))}
        </Grid>
      </SimpleBlock>
      <Separator size="4" />
      <SimpleBlock title="Quarterly reports">
        {transparency.map((report) => (
          <Box key={report.link}>
            <Text size="4">
              <NLink href={report.link} target="_blank" variant="subtle">
                {report.name}
              </NLink>
            </Text>
          </Box>
        ))}
      </SimpleBlock>
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
        items={newsPosts.map((post) => ({
          title: post.title,
          link: sitemap.newsroom.newsPost.replace('[slug]', post.slug),
        }))}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const foundation = await getMdxFile('content/sections/foundation.mdx')
  const newsPosts = await getNewsPosts({
    limit: 3,
    includeHtml: false,
  })

  return {
    props: {
      foundation,
      team,
      newsPosts,
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Foundation
