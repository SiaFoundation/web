import { DatumCard } from '@siafoundation/design-system'
import { useAdminState } from '@siafoundation/indexd-react'

export function Node() {
  const state = useAdminState({
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-wrap gap-7">
        <DatumCard
          label="Height"
          value={
            state.data
              ? Number(state.data.syncHeight).toLocaleString()
              : undefined
          }
          comment={!state.data?.synced ? 'Syncing' : undefined}
        />
      </div>
    </div>
  )
}
