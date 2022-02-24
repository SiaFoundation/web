import { Separator } from '@siafoundation/design-system'
import { ContentBlock } from '../../components/ContentBlock'
import { Layout } from '../../components/Layout'
import { external } from '../../config/site'
import { getArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { ContentGallery } from '../../components/ContentGallery'
import { CtaLarge } from '../../components/CtaLarge'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function CommunityEcosystem({ blogs }: Props) {
  return (
    <Layout>
      <ContentBlock
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
        title="Recent Posts"
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
        title="Built on Sia"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officiis!
        `}
        items={blogs}
      />
      <Separator size="4" />
      <CtaLarge
        title="Sia Forum"
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
  const blogs = getArticles('ecosystem', 3)

  return {
    props: {
      blogs,
    },
  }
}

export default CommunityEcosystem
