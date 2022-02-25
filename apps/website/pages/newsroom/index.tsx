import omit from 'lodash/omit'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { generateRssNewsFeed, getNewsPosts } from '../../content/news'
import { AsyncReturnType } from '../../lib/types'
import { ContentGallery } from '../../components/ContentGallery'
import { getStats } from '../../content/stats'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Newsroom({ posts, stats }: Props) {
  return (
    <Layout stats={stats}>
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
        items={posts}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const posts = await getNewsPosts({
    includeHtml: true,
  })

  // Generate RSS feed, requires `html`
  generateRssNewsFeed(posts)

  // Remove `html` before rendering page
  return {
    props: {
      stats,
      posts: posts.map((post) => omit(post, 'html')),
    },
  }
}

export default Newsroom
