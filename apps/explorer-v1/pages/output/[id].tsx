import { useEntity } from '../../hooks/useEntity'
import { useRouter } from 'next/router'
import { OutputEntity } from '../../components/entities/OutputEntity'
import { OutputEntitySkeleton } from '../../components/entities/OutputEntitySkeleton'
import { Entity404 } from '../../components/entities/Entity404'

export default function ViewOutput() {
  const router = useRouter()
  const entity = useEntity(router.query.id as string)

  if (entity.data?.type === 'output') {
    return <OutputEntity entity={entity.data} />
  }

  if (entity.data?.type === 'error') {
    return (
      <Entity404 message="Not found, double check the output and try again." />
    )
  }

  return <OutputEntitySkeleton />
}
