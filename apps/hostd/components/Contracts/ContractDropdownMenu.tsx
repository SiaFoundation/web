import {
  DropdownMenu,
  Button,
  Draggable16,
  DropdownMenuLabel,
  DropdownMenuItem,
  triggerErrorToast,
  triggerSuccessToast,
  Code,
  Link,
  DropdownMenuLeftSlot,
  DataCheck16,
  Tooltip,
} from '@siafoundation/design-system'
import {
  ContractStatus,
  useContractsIntegrityCheck,
} from '@siafoundation/react-hostd'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'

type Props = {
  id: string
  status: ContractStatus
}

export function ContractDropdownMenu({ id, status }: Props) {
  const integrityCheck = useContractsIntegrityCheck()
  const { openDialog } = useDialog()
  const runIntegrityCheck = useCallback(async () => {
    const response = await integrityCheck.put({
      params: {
        id,
      },
    })
    if (response.error) {
      triggerErrorToast(response.error)
    } else {
      triggerSuccessToast(
        <>
          Integrity check successfully started, depending on contract data size
          this operation can take a while. Check <Code>hostd</Code>{' '}
          <Link onClick={() => openDialog('alerts')}>alerts</Link> for status
          updates.
        </>,
        {
          duration: 12_000,
        }
      )
    }
  }, [id, integrityCheck, openDialog])

  const dataIntegrityCheckAvailable = ['active', 'pending'].includes(status)
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      {/* <DropdownMenuLabel>Filters</DropdownMenuLabel> */}
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <Tooltip
        content={
          dataIntegrityCheckAvailable
            ? 'Trigger a data integrity check'
            : 'Data integrity check only available for active or pending contracts'
        }
      >
        <div>
          <DropdownMenuItem
            disabled={!dataIntegrityCheckAvailable}
            onSelect={() => runIntegrityCheck()}
          >
            <DropdownMenuLeftSlot>
              <DataCheck16 />
            </DropdownMenuLeftSlot>
            Integrity check
          </DropdownMenuItem>
        </div>
      </Tooltip>
    </DropdownMenu>
  )
}
