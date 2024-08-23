import {
  ContentGallery,
  ContentItemProps,
  SiteHeading,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getNewsFeed } from '../../content/feed'
import { minutesInSeconds } from '@siafoundation/units'
import { SectionSolid } from '../../components/SectionSolid'
import { backgrounds, previews } from '../../content/assets'
import { SectionTransparent } from '../../components/SectionTransparent'

const title = 'News'
const description = 'Updates from the Sia Foundation and the Sia ecosystem.'

function News() {
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
      path={routes.news.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
            links={[
              {
                title: 'Subscribe via RSS',
                link: routes.news.feed.rss,
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
          filters={['foundation', 'ecosystem']}
          filterable="news"
          columnClassName="grid-cols-1"
          items={posts.data || []}
        />
      </SectionSolid>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const posts = await getNewsFeed()

  return {
    props: {
      fallback: {
        '/api/news': posts,
        '/api/stats': stats,
      },
    },
    revalidate: minutesInSeconds(5),
  }
}

export default News
