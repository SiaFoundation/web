import { Separator, ContentGallery, CtaBox } from '@siafoundation/design-system'
import { ContentBlock } from '../../../../libs/design-system/src/components/ContentBlock'
import { Layout } from '../../components/Layout'
import { external } from '../../config/site'
import { getArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getSoftware } from '../../content/software'
import { getStats } from '../../content/stats'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function CommunityEcosystem({ stats, blogs, software }: Props) {
  return (
    <Layout stats={stats}>
      <ContentBlock
        size="3"
        align="start"
        title="Community & ecosystem"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officiis!
        `}
        links={[
          {
            title: 'Join our Discord',
            link: external.discord,
            newTab: true,
          },
          {
            title: 'Browse Reddit',
            link: external.reddit,
            newTab: true,
          },
        ]}
      />
      <Separator size="4" />
      <ContentGallery
        title="The latest from the Sia community"
        size="2"
        align="start"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officiis!
        `}
        links={[
          {
            title: 'Browse the blog',
            link: external.blog,
            newTab: true,
          },
        ]}
        items={blogs}
      />
      <Separator size="4" />
      <ContentGallery
        title="A vibrant & active ecosystem"
        filterable="software"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officiis!
        `}
        items={software.map((i) => ({ ...i, newTab: true }))}
      />
      <Separator size="4" />
      <CtaBox
        title="Sia Forum"
        size="2"
        description={`
          Do you have site feedback, development input, or a long-form proposal for the Sia Foundation?
        `}
        actionTitle="Join the discussion"
        actionLink={external.forum}
        actionNewTab
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const blogs = getArticles('ecosystem', 3)
  const software = getSoftware(null)

  return {
    props: {
      stats,
      blogs,
      software,
    },
  }
}

export default CommunityEcosystem
