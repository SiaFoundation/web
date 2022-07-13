import { fetchEntity, getEntityKey, useEntity } from '../../hooks/useEntity'
import { useRouter } from 'next/router'
import { AddressEntity } from '../../components/entities/AddressEntity'
import { AddressEntitySkeleton } from '../../components/entities/AddressEntitySkeleton'
import { Entity404 } from '../../components/entities/Entity404'
import { routes } from '../../config/routes'
import { Layout } from '../../components/Layout'
import { getTitleId } from '@siafoundation/design-system'

export default function ViewAddress() {
  const router = useRouter()
  const id = (router.query.id || '') as string
  const entity = useEntity(id)

  const title = getTitleId('Address', id, 6)
  const description = getTitleId('View details for address', id, 6)
  const path = routes.address.view.replace('[id]', id)

  if (entity.data?.type === 'address') {
    return (
      <Layout title={title} description={description} path={path}>
        <AddressEntity entity={entity.data} />
      </Layout>
    )
  }

  if (entity.data?.type === 'error') {
    return (
      <Layout title={title} description={description} path={path}>
        <Entity404 message="Not found, double check the address and try again." />
      </Layout>
    )
  }

  return (
    <Layout title={title} description={description} path={path}>
      <AddressEntitySkeleton />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const id: string = params.id
    const entity = await fetchEntity(id)

    return {
      props: {
        fallback: {
          [getEntityKey(id)]: entity,
        },
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}
