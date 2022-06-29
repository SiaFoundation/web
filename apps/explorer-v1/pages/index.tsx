import { Home } from '../components/Home'
import { Layout } from '../components/Layout'
import { routes } from '../config/routes'

export default function HomePage() {
  const title = 'Home'
  const description = 'Sia blockchain explorer'
  const path = routes.home.index

  return (
    <Layout title={title} description={description} path={path}>
      <Home />
    </Layout>
  )
}
