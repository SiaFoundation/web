import { useRouter } from 'next/router'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'

function NewsroomPost(p) {
  const { query } = useRouter()
  const slug = query.slug as string
  return (
    <Layout>
      <Heading>Newsroom / {slug}</Heading>
      <Block title={slug} />
    </Layout>
  )
}

export default NewsroomPost
