import { Flex, Heading, NLink, Text } from '@siafoundation/design-system'
import omit from 'lodash/omit'
import { format } from 'date-fns'
import { SimpleBlock } from '../../components/SimpleBlock'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { generateRssNewsFeed, getNewsPosts } from '../../content/news'
import { AsyncReturnType } from '../../lib/types'
import { ContentGallery } from '../../components/ContentGallery'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Newsroom({ posts }: Props) {
  return (
    <Layout>
      <ContentGallery
        size="3"
        title="Newsroom"
        description={`
          The latest Sia news and press releases.
        `}
        links={[
          {
            title: 'Subscribe with RSS',
            link: sitemap.newsroom.feed.rss,
            newTab: true,
          },
        ]}
        items={posts.map((post) => ({
          title: post.title,
          subtitle: `${post.location} - ${format(post.date, 'PPPP')}`,
          description: post.description,
          link: sitemap.newsroom.newsPost.replace('[slug]', post.slug),
        }))}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getNewsPosts({
    includeHtml: true,
  })

  // Generate RSS feed, requires `html`
  generateRssNewsFeed(posts)

  // Remove `html` before rendering page
  return {
    props: {
      posts: posts.map((post) => omit(post, 'html')),
    },
  }
}

export default Newsroom
