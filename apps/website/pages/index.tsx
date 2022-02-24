import { Codeblock, Heading, NLink, Text } from '@siafoundation/design-system'
import { SimpleBlock } from '../components/SimpleBlock'
import { Layout } from '../components/Layout'
import { sitemap } from '../config/site'
import { getDaysInSeconds } from '../lib/time'
import { getDataSourceProps } from '../content/data'
import { MDXRemote } from 'next-mdx-remote'
import { getMdxFile } from '../lib/mdx'
import { AsyncReturnType } from '../lib/types'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Home({
  data: {
    storage,
    hostsActive,
    hostsStats,
    mapDataFeatureCount,
    github,
    benchmarks,
    downloadCounts,
  },
  headline,
}: Props) {
  return (
    <Layout>
      <Heading></Heading>
      <MDXRemote {...headline.content} />
      <SimpleBlock title="Hero + headline">
        <NLink href={sitemap.developers.index}>Download</NLink>
      </SimpleBlock>
      <SimpleBlock title="Stats / validation">
        <Text>hosts active:</Text>
        <pre>
          <Codeblock>{JSON.stringify(hostsActive, null, 2)}</Codeblock>
        </pre>
        <Text>hosts stats:</Text>
        <pre>
          <Codeblock>{JSON.stringify(hostsStats, null, 2)}</Codeblock>
        </pre>
        <Text>storage:</Text>
        <pre>
          <Codeblock>{JSON.stringify(storage, null, 2)}</Codeblock>
        </pre>
        <Text>geo data:</Text>
        <pre>
          <Codeblock>{mapDataFeatureCount} features</Codeblock>
        </pre>
        <Text>github:</Text>
        <pre>
          <Codeblock>{JSON.stringify(github, null, 2)}</Codeblock>
        </pre>
        <Text>downloads:</Text>
        <pre>
          <Codeblock>{JSON.stringify(downloadCounts, null, 2)}</Codeblock>
        </pre>
        <Text>benchmarks:</Text>
        <pre>
          <Codeblock>{JSON.stringify(benchmarks, null, 2)}</Codeblock>
        </pre>
      </SimpleBlock>
      <SimpleBlock title="Ecosystem / in use"></SimpleBlock>
      <SimpleBlock title="Get Started / beginner tutorials"></SimpleBlock>
      <SimpleBlock title="Blog posts or tweets"></SimpleBlock>
      <SimpleBlock title="Developers / resources"></SimpleBlock>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getDataSourceProps()
  const headline = await getMdxFile('content/sections/headline.mdx')

  return {
    props: {
      data,
      headline,
    },
    revalidate: getDaysInSeconds(1),
  }
}
