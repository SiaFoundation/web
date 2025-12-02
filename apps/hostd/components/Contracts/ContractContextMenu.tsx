import {
  DropdownMenu,
  Button,
  DropdownMenuLabel,
  DropdownMenuItem,
  triggerErrorToast,
  triggerSuccessToast,
  Code,
  Link,
  DropdownMenuLeftSlot,
  Tooltip,
  Text,
} from '@siafoundation/design-system'
import { CaretDown16, DataCheck16 } from '@siafoundation/react-icons'
import { useContractsIntegrityCheck } from '@siafoundation/hostd-react'
import { useCallback } from 'react'
import { routes } from '../../config/routes'

type Props = {
  id: string
  status:
    | 'pending'
    | 'active'
    | 'rejected'
    | 'failed'
    | 'renewed'
    | 'successful'
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
  const runIntegrityCheck = useCallback(async () => {
    const response = await integrityCheck.put({
      params: {
        id,
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error starting integrity check',
        body: response.error,
      })
    } else {
      triggerSuccessToast({
        title: 'Integrity check started',
        body: (
          <>
            Depending on contract data size this operation can take a while.
            Check <Code>hostd</Code>{' '}
            <Link href={routes.alerts.index}>alerts</Link> for status updates.
          </>
        ),
        options: {
          duration: 12_000,
        },
      })
    }
  }, [id, integrityCheck])

  const dataIntegrityCheckAvailable = ['active', 'pending'].includes(status)
  return (
    <DropdownMenu
      trigger={
        <Button
          aria-label="contract context menu"
          icon="hover"
          size="none"
          {...buttonProps}
        >
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        onClick: (e) => e.stopPropagation(),
        align: 'start',
        ...contentProps,
      }}
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
