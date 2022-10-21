import {
  Grid,
  Text,
  ContentItem,
  getImageProps,
  SiteHeading,
  Box,
} from '@siafoundation/design-system'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { format } from 'date-fns'
import { Layout } from '../../components/Layout'
import { GetNewsPost, getNewsPost, newsDirectory } from '../../content/news'
import { getCacheStats } from '../../content/stats'
import { routes } from '../../config/routes'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/nate-waterfall.png'
import previewImage from '../../assets/previews/nate-waterfall.png'
import { components } from '../../config/mdx'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSimple } from '../../components/SectionSimple'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

type Props = GetNewsPost

function NewsroomPost({
  post: { title, subtitle, location, date, source, slug },
  prev,
  next,
}: Props) {
  return (
    <Layout
      title={title}
      description={textContent(subtitle)}
      date={new Date(date).toISOString()}
      path={routes.newsroom.newsPost.replace('[slug]', slug)}
      heading={
        <SectionSimple css={{ py: '$max' }}>
          <SiteHeading size="64" title={title} description={subtitle} />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionSimple css={{ pt: '$9', pb: '$max' }}>
        <Box>
          <Text weight="bold" size="16">
            {location} - {format(new Date(date), 'PP')}
          </Text>
          <MDXRemote {...source} components={components} />
        </Box>
        {(prev || next) && (
          <Grid
            gap="3"
            css={{ marginTop: '$8' }}
            columns={{
              '@initial': '1',
              '@bp1': '2',
            }}
          >
            {prev && <ContentItem {...prev} />}
            {next && <ContentItem {...next} />}
          </Grid>
        )}
      </SectionSimple>
    </Layout>
  )
}

async function getStaticPaths() {
  const files = fs.readdirSync(newsDirectory)

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

async function getStaticProps({ params: { slug } }) {
  const stats = await getCacheStats()
  const props = await getNewsPost(slug)

  return {
    props: {
      ...props,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}

export { getStaticProps, getStaticPaths }
export default NewsroomPost
