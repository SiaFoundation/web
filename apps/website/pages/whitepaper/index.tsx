import { Layout } from '../../components/Layout'
import { ContentBlock } from '../../components/ContentBlock'
import { sitemap } from '../../config/site'
import { getStats, Stats } from '../../content/stats'
import { getDaysInSeconds } from '../../lib/time'

type Props = {
  stats: Stats
}

function Whitepaper({ stats }: Props) {
  return (
    <Layout stats={stats}>
      <ContentBlock
        title="Whitepaper"
        description={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nesciunt?
        `}
        links={[
          {
            title: 'Download PDF',
            link: sitemap.whitepaper.pdf,
            newTab: true,
          },
        ]}
      />
      <iframe height="1000px" width="100%" src={sitemap.whitepaper.pdf} />
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()

  return {
    props: {
      stats,
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Whitepaper
