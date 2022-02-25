import { Flex, Grid, Separator } from '@siafoundation/design-system'
import { ContentBlock } from '../../components/ContentBlock'
import { Layout } from '../../components/Layout'
import { external, sitemap } from '../../config/site'
import { ContentGallery } from '../../components/ContentGallery'
import { CtaLarge } from '../../components/CtaLarge'
import { getStats, Stats } from '../../content/stats'
import { getDaysInSeconds } from '../../lib/time'

type Props = {
  stats: Stats
}

function Learn({ stats }: Props) {
  return (
    <Layout stats={stats}>
      <ContentBlock
        title="Learn"
        description={`
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
        `}
      />
      <Grid
        align="center"
        columns={{
          '@initial': 1,
          '@bp3': 2,
        }}
      >
        <ContentBlock
          title="Sia 101"
          align="start"
          links={[
            {
              title: 'Learn more',
              link: external.docs.sia101,
              newTab: true,
            },
          ]}
          description={`
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
        `}
        />
        <Flex direction="column">
          <ContentBlock
            title="What Sia does"
            size="1"
            align="start"
            description={`
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
            `}
            links={[
              {
                title: 'Learn how Sia works',
                link: external.docs.sia101,
                newTab: true,
              },
            ]}
          />
          <ContentBlock
            title="Why it's here"
            size="1"
            align="start"
            description={`
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
            `}
            links={[
              {
                title: 'Explore the community',
                link: sitemap.community.index,
              },
            ]}
          />
          <ContentBlock
            title="Who makes Sia?"
            size="1"
            align="start"
            description={`
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
            `}
            links={[
              {
                title: 'Meet the Sia Foundation',
                link: sitemap.foundation.index,
              },
            ]}
          />
        </Flex>
      </Grid>
      <Separator size="4" />
      <ContentBlock
        title="How Sia Works"
        size="2"
        align="center"
        description={`
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
            `}
        links={[
          {
            title: 'Read the whitepaper',
            link: sitemap.whitepaper.index,
          },
        ]}
      />
      <Separator size="4" />
      <ContentGallery
        title="Get Started"
        description={`
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, sapiente!
      `}
        links={[
          {
            title: 'Explore Documentation',
            link: external.docs.index,
            newTab: true,
          },
        ]}
        items={[
          {
            title: 'Renting',
            description: 'Learn how to rent storage space on the Sia network.',
            link: external.docs.renting,
            newTab: true,
          },
          {
            title: 'Wallet',
            description:
              'Learn how create a wallet and make transactions on the Sia network.',
            link: external.docs.wallet,
            newTab: true,
          },
          {
            title: 'Hosting',
            description: `Learn how offer storage space on the the Sia network's storage marketplace.`,
            link: external.docs.hosting,
            newTab: true,
          },
        ]}
      />
      <Separator size="4" />
      <CtaLarge
        slogan="Start building"
        title="Developer Resources"
        description={`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, voluptatem?
        `}
        actionTitle="Explore"
        actionLink={sitemap.developers.index}
      />
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

export default Learn
