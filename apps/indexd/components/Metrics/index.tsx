import { Warning32 } from '@siafoundation/react-icons'
import { DatumCard, Text } from '@siafoundation/design-system'
import { useAdminStatsSectors } from '@siafoundation/indexd-react'

export function Metrics() {
  const state = useAdminStatsSectors()
  return (
    <div className="flex flex-col gap-5 p-5">
      {state.error ? (
        <div className="flex flex-col gap-6 items-center justify-center pt-[100px]">
          <Warning32 className="scale-150" />
          <Text size="20" color="subtle">
            Error loading stats
          </Text>
        </div>
      ) : (
        <div className="flex flex-wrap gap-7">
          <DatumCard
            label="Slabs"
            value={state.data?.numSlabs?.toLocaleString()}
          />
        </div>
      )}
    </div>
  )
}
