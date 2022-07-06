import { Home } from '../components/Home'
import { Layout } from '../components/Layout'
import { routes } from '../config/routes'
import { fetchEntity, getEntityKey } from '../hooks/useEntity'
import { fetchLanding, landingKey } from '../hooks/useLanding'
import { fetchStatus, statusKey } from '../hooks/useStatus'

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

export async function getServerSideProps() {
  try {
    const [status, landing] = await Promise.all([fetchStatus(), fetchLanding()])
    const height = String(status.lastblock)
    const block = await fetchEntity(String(height))

    return {
      props: {
        fallback: {
          [statusKey]: status,
          [landingKey]: landing,
          [getEntityKey(height)]: block,
        },
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}
