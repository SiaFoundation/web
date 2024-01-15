import { Button, Text } from '@siafoundation/design-system'
import { Filter32 } from '@siafoundation/react-icons'
import { usePeers } from '../../../contexts/peers'

export function StateNoneMatching() {
  const { filters, resetFilters } = usePeers()
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <Filter32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          No peers matching filters.
        </Text>
        {!!filters.length && (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              resetFilters()
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
