import Link from 'next/link'
import { Block } from '../../components/Block'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'

function Newsroom() {
  return (
    <Layout>
      <Heading>Newsroom</Heading>
      <Block>
        <Link href="/newsroom/post-1">Post 1</Link>
      </Block>
    </Layout>
  )
}

export default Newsroom
