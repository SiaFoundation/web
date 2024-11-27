import {
  Button,
  Code,
  handleBatchOperation,
  Link,
} from '@siafoundation/design-system'
import { DataCheck16 } from '@siafoundation/react-icons'
import { useCallback, useMemo } from 'react'
import { pluralize } from '@siafoundation/units'
import { useContracts } from '../../../contexts/contracts'
import { useContractsIntegrityCheck } from '@siafoundation/hostd-react'
import { useDialog } from '../../../contexts/dialog'

export function ContractsBulkIntegrityCheck() {
  const { openDialog } = useDialog()
  const { multiSelect } = useContracts()
  const integrityCheck = useContractsIntegrityCheck()

  const ids = useMemo(
    () => Object.entries(multiSelect.selectionMap).map(([_, item]) => item.id),
    [multiSelect.selectionMap]
  )
  const checkAll = useCallback(async () => {
    await handleBatchOperation(
      ids.map((id) =>
        integrityCheck.put({
          params: {
            id,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Integrity checks started for ${pluralize(
            successCount,
            'contract'
          )}`,
          body: `Error starting integrity checks for ${errorCount}/${totalCount} total contracts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Integrity checks started for ${pluralize(
            totalCount,
            'contract'
          )}`,
          body: (
            <>
              Depending on contract data size this operation can take a while.
              Check <Code>hostd</Code>{' '}
              <Link onClick={() => openDialog('alerts')}>alerts</Link> for
              status updates.
            </>
          ),
        }),
        after: () => {
          multiSelect.deselectAll()
        },
      }
    )
  }, [multiSelect, ids, integrityCheck, openDialog])

  return (
    <Button
      aria-label="run integrity check for each contract"
      tip="Run integrity check for each contract"
      onClick={checkAll}
    >
      <DataCheck16 />
    </Button>
  )
}
