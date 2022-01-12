import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Text } from '../../system/Text'
import { Heading } from '../../system/Heading'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { Link } from '../../system/Link'

function NewsroomPost({ title, description, location, date, mdxSource }) {
  return (
    <Layout>
      <Heading>
        <Link href={sitemap.newsroom.index}>Newsroom</Link>
        {` / ${title}`}
      </Heading>
      <Text>{description}</Text>
      <Text>
        {location} - {format(date, 'PPPP')}
      </Text>
      <MDXRemote {...mdxSource} />
    </Layout>
  )
}

async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.mdx'),
    'utf-8'
  )

  const { data, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      ...data,
      date: new Date(data.date).getTime(),
      slug,
      mdxSource,
    },
  }
}

export { getStaticProps, getStaticPaths }
export default NewsroomPost
