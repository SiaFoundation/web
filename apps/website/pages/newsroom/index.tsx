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
import backgroundImage from '../../assets/backgrounds/steps.png'
import previewImage from '../../assets/previews/steps.png'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

type Props = AsyncReturnType<typeof getStaticProps>['props']

const title = 'Newsroom'
const description = 'Read the latest Sia announcements and press releases.'

function Newsroom({ posts, stats }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={sitemap.newsroom.index}
      heading={
        <Section size="4">
          <SiteHeading
            size="64"
            title={title}
            description={description}
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
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
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
