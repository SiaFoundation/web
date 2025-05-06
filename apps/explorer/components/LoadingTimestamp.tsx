import { ClientSideOnly, Skeleton } from '@siafoundation/design-system'

export default function LoadingTimestamp({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ClientSideOnly
      fallback={
        <Skeleton
          className={`h-[20px] w-[200px] ${className ?? ''}`}
          aria-hidden="true"
        />
      }
    >
      {children}
    </ClientSideOnly>
  )
}
