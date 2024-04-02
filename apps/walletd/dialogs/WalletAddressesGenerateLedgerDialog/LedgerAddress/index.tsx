import {
  Paragraph,
  Button,
  ValueCopyable,
  Text,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useCallback, useState } from 'react'
import { useLedger } from '../../../contexts/ledger'
import { AddressLayout } from './AddressLayout'

export function LedgerAddress({
  index,
  address,
  isNew,
  setAddress,
  remove,
}: {
  index: number
  address: string
  isNew: boolean
  setAddress: (params: {
    index: number
    address: string
    publicKey: string
  }) => void
  remove: () => void
}) {
  const { device, error, setError } = useLedger()
  const [waitingForUser, setWaitingForUser] = useState(false)

  const generateAddresses = useCallback(async () => {
    if (!device) {
      return
    }
    if (error) {
      triggerErrorToast({
        title: 'Error connecting to Ledger',
        body: error.message,
      })
      return
    }
    try {
      setWaitingForUser(true)
      const pkResponse = await device.sia.verifyStandardAddress(index)
      setAddress({
        index,
        address: pkResponse.address,
        publicKey: pkResponse.publicKey,
      })
    } catch (e) {
      setError(e)
      console.log(e)
    }
    setWaitingForUser(false)
  }, [index, device, error, setError, setAddress])

  return (
    <div className="flex flex-col gap-1">
      {address ? (
        <AddressLayout
          title={`Address ${index}`}
          isNew={isNew}
          remove={remove}
          address={address}
          details={
            <div className="flex flex-col gap-1">
              <ValueCopyable
                value={address}
                label="public key 0"
                color="subtle"
                maxLength={30}
              />
            </div>
          }
        />
      ) : waitingForUser ? (
        <AddressLayout
          title={`Address ${index}`}
          isNew={isNew}
          remove={remove}
          details={
            <div className="flex flex-col gap-1">
              <Text>Please confirm on device...</Text>
              <Paragraph size="14" color="subtle">
                To continue, approve address generation on device.
              </Paragraph>
            </div>
          }
        />
      ) : (
        <AddressLayout
          title={`Address ${index}`}
          isNew={isNew}
          remove={remove}
          actions={
            <>
              <Button size="small" onClick={generateAddresses}>
                Generate
              </Button>
            </>
          }
        />
      )}
    </div>
  )
}
