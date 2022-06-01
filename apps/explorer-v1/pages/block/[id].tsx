import { useEntity } from '../../hooks/useEntity'
import { useRouter } from 'next/router'
import { BlockEntity } from '../../components/entities/BlockEntity'
import { BlockEntitySkeleton } from '../../components/entities/BlockEntitySkeleton'
import { Entity404 } from '../../components/entities/Entity404'

export default function ViewBlock() {
  const router = useRouter()
  const entity = useEntity(router.query.id as string)

  if (entity.data?.type === 'block') {
    return <BlockEntity entity={entity.data} />
  }

  if (entity.data?.type === 'error') {
    return (
      <Entity404 message="Not found, double check the block number and try again." />
    )
  }
  return <BlockEntitySkeleton />
}
