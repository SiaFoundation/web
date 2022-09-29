import {
  ContentGallery,
  ContentItemProps,
  getImageProps,
  Section,
  SiteHeading,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import backgroundImage from '../../assets/backgrounds/steps.png'
import previewImage from '../../assets/previews/steps.png'
import { generateRssNewsFeed } from '../../content/rss'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getFeed } from '../../content/feed'
import { getDaysInSeconds } from '../../lib/time'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'Newsroom'
const description =
  'News from around the ecosystem and official Sia Foundation press releases.'

function Newsroom() {
  const router = useRouter()
  const filter = router.query.news
  const route = filter ? `/api/news?news=${filter}` : '/api/news'
  const posts = useSWR<ContentItemProps[]>(route, async () => {
    const response = await fetch(route)
    return response.json()
  })
  return (
    <Layout
      title={title}
      description={description}
      path={routes.newsroom.index}
      heading={
        <Section size="4">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            links={[
              {
                title: 'press releases RSS',
                link: routes.newsroom.feed.rss,
                newTab: true,
              },
            ]}
          />
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section>
        <ContentGallery
          filterMode="external"
          filters={['press', 'ecosystem']}
          filterable="news"
          columns="1"
          items={posts.data || []}
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  await generateRssNewsFeed()

  const stats = await getStats()
  const posts = await getFeed()

  return {
    props: {
      fallback: {
        '/api/news': posts,
        '/api/stats': stats,
      },
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Newsroom
