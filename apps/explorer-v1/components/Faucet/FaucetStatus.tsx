import {
  Button,
  Copy24,
  copyToClipboard,
  Label,
  LoadingDots,
  Paragraph,
  ProgressSteps,
  Text,
  TextField,
  ValueCopyable,
  ValueSc,
} from '@siafoundation/design-system'
import { toHastings } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useFaucetStatus } from '../../hooks/useFaucetStatus'
import { useDebounce } from 'use-debounce'
import { routes } from '../../config/routes'

type Props = {
  id: string
  setId: (id: string) => void
}

export function FaucetStatus({ id: _id, setId }: Props) {
  const [id] = useDebounce(_id, 1000)
  const [success, setSuccess] = useState(false)
  const status = useFaucetStatus(id, {
    revalidateOnFocus: !success,
    refreshInterval: !success ? 30_000 : undefined,
  })

  useEffect(() => {
    setSuccess(false)
    status.mutate(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (status.data) {
      setSuccess(status.data.status === 'confirmed')
    }
  }, [status.data, setSuccess])

  return (
    <div className="flex flex-col gap-4">
      <Paragraph size="14">Check the status of a faucet transaction.</Paragraph>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-4">
          <Label className="text-gray-800 dark:text-graydark-800">ID</Label>
          {status.error && (
            <Text size="14" color="red" ellipsis>
              {status.error.message}
            </Text>
          )}
        </div>
        <div className="flex gap-1">
          <TextField
            size="medium"
            placeholder="Fund request ID, eg: 0e2d1d9a5cab5..."
            value={_id}
            onChange={(e) => setId(e.target.value)}
          />
          {status.data && (
            <Button
              size="medium"
              onClick={() => copyToClipboard(_id, 'fund request ID')}
            >
              <Copy24 />
            </Button>
          )}
        </div>
      </div>
      {status.data && (
        <div className="flex flex-col gap-3">
          <ProgressSteps
            onChange={() => null}
            steps={[
              {
                id: 'pending',
                label: 'pending',
              },
              {
                id: 'broadcast',
                label: 'broadcasting',
              },
              {
                id: 'confirmed',
                label: 'confirmed',
              },
            ]}
            activeStep={status.data?.status}
          />
          <div className="flex gap-2 justify-between items-center">
            <Text color="verySubtle">Amount</Text>
            <div className="flex relative top-[-0.5px]">
              <ValueSc
                size="14"
                value={new BigNumber(toHastings(status.data?.amount))}
                variant="value"
                fixed={0}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <Text color="verySubtle">Address</Text>
            <div className="flex relative top-[-0.5px]">
              <ValueCopyable
                size="14"
                type="address"
                value={status.data?.unlockHash || ''}
              />
            </div>
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Text color="verySubtle">Transaction ID</Text>
            {status.data?.transactionID !==
            '0000000000000000000000000000000000000000000000000000000000000000' ? (
              <ValueCopyable
                type="transaction"
                value={status.data.transactionID}
                href={routes.tx.view.replace('[id]', status.data.transactionID)}
              />
            ) : (
              <LoadingDots />
            )}
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Text color="verySubtle">Block ID</Text>
            {status.data?.blockID !==
            '0000000000000000000000000000000000000000000000000000000000000000' ? (
              <ValueCopyable
                type="block"
                value={status.data.blockID}
                href={routes.block.view.replace('[id]', status.data.blockID)}
              />
            ) : (
              <LoadingDots />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
