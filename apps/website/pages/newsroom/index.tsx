import {
  ContentGallery,
  ContentItemProps,
  SiteHeading,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import { generateRssNewsFeed } from '../../content/newsGenerateFeed'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getFeedAndNews } from '../../content/feed'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSolid } from '../../components/SectionSolid'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { SectionTransparent } from '../../components/SectionTransparent'

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
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
            links={[
              {
                title: 'Press releases RSS',
                link: routes.newsroom.feed.rss,
                newTab: true,
              },
            ]}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.steps}
      previewImage={previews.steps}
    >
      <SectionSolid className="pt-8 md:pt-12 xl:pt-20 pb-24 md:pb-40">
        <ContentGallery
          filterMode="external"
          filters={['press', 'ecosystem']}
          filterable="news"
          columnClassName="grid-cols-1"
          items={posts.data || []}
        />
      </SectionSolid>
    </Layout>
  )
}

export async function getStaticProps() {
  await generateRssNewsFeed()
  const stats = await getStats()
  const posts = await getFeedAndNews()

  return {
    props: {
      fallback: {
        '/api/news': posts,
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}

export default Newsroom
