import { useEntity } from '../../hooks/useEntity'
import { useRouter } from 'next/router'
import { AddressEntity } from '../../components/entities/AddressEntity'
import { AddressEntitySkeleton } from '../../components/entities/AddressEntitySkeleton'
import { Entity404 } from '../../components/entities/Entity404'

export default function ViewAddress() {
  const router = useRouter()
  const entity = useEntity(router.query.id as string)

  if (entity.data?.type === 'address') {
    return <AddressEntity entity={entity.data} />
  }

  if (entity.data?.type === 'error') {
    return (
      <Entity404 message="Not found, double check the address and try again." />
    )
  }

  // reroute other types

  return <AddressEntitySkeleton />
}
