import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  PaginatorKnownTotal,
} from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { ContractsFilterMenu } from './ContractsFilterMenu'

export function ContractsFiltersBar() {
  const {
    offset,
    limit,
    datasetFilteredTotal,
    datasetState,
    versionMode,
    setVersionMode,
  } = useContracts()

  return (
    <div className="flex gap-2 w-full">
      <div>
        <DropdownMenu
          contentProps={{
            side: 'bottom',
            align: 'start',
          }}
          trigger={
            <Button
              aria-label="contracts version mode"
              tip={
                versionMode === 'v2'
                  ? 'Currently viewing v2 contracts'
                  : 'Currently viewing v1 contracts'
              }
              variant="active"
            >
              {versionMode === 'v2' ? 'v2' : 'v1'}
            </Button>
          }
        >
          <DropdownMenuItem onSelect={() => setVersionMode('v2')}>
            View v2 contracts
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setVersionMode('v1')}>
            View v1 contracts
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
      <div className="flex-1">
        <ContractsFilterMenu />
      </div>
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        isLoading={datasetState === 'loading'}
        total={datasetFilteredTotal}
      />
    </div>
  )
}
