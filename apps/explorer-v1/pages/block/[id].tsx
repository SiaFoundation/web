import { fetchEntity, getEntityKey, useEntity } from '../../hooks/useEntity'
import { useRouter } from 'next/router'
import { BlockEntity } from '../../components/entities/BlockEntity'
import { BlockEntitySkeleton } from '../../components/entities/BlockEntitySkeleton'
import { Entity404 } from '../../components/entities/Entity404'
import { routes } from '../../config/routes'
import { Layout } from '../../components/Layout'
import { humanNumber } from '@siafoundation/sia-js'
import { getTitleId } from '@siafoundation/design-system'

export default function ViewBlock() {
  const router = useRouter()
  const id = (router.query.id || '') as string
  const entity = useEntity(id)

  let block = id
  if (!isNaN(Number(id))) {
    block = humanNumber(id)
  }

  const title = getTitleId('Block', block)
  const description = getTitleId('View details for block', block)
  const path = routes.block.view.replace('[id]', id)

  if (entity.data?.type === 'block') {
    return (
      <Layout title={title} description={description} path={path}>
        <BlockEntity entity={entity.data} />
      </Layout>
    )
  }

  if (entity.data?.type === 'error') {
    return (
      <Layout title={title} description={description} path={path}>
        <Entity404 message="Not found, double check the block number and try again." />
      </Layout>
    )
  }

  return (
    <Layout title={title} description={description} path={path}>
      <BlockEntitySkeleton />
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
