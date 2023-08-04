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
  Text,
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
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function ContractContextMenu({
  id,
  status,
  contentProps,
  buttonProps,
}: Props) {
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
        <Button variant="ghost" icon="hover" {...buttonProps}>
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start', ...contentProps }}
    >
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Contract {id.slice(0, 24)}...
        </Text>
      </div>
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
