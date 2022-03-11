import omit from 'lodash/omit'
import {
  ContentGallery,
  getImageProps,
  Section,
  SiteHeading,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { generateRssNewsFeed, getNewsPosts } from '../../content/news'
import { AsyncReturnType } from '../../lib/types'
import { getStats } from '../../content/stats'
import background from '../../assets/backgrounds/road-dither.png'

const backgroundImage = getImageProps(background)

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Newsroom({ posts, stats }: Props) {
  return (
    <Layout
      heading={
        <Section size="4">
          <SiteHeading
            size="3"
            title="Newsroom"
            description={
              <>Read the latest Sia announcements and press releases.</>
            }
            links={[
              {
                title: 'Subscribe with RSS',
                link: sitemap.newsroom.feed.rss,
                newTab: true,
              },
            ]}
          />
        </Section>
      }
      stats={stats}
      backgroundImage={backgroundImage}
    >
      <Section>
        <ContentGallery columns="1" items={posts} />
      </Section>
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
