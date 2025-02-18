import { ClientSideOnly, Skeleton } from '@siafoundation/design-system'

export default function LoadingTimestamp({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientSideOnly fallback={<Skeleton className="w-[200px] h-[20px]" />}>
      {children}
    </ClientSideOnly>
  )
}
