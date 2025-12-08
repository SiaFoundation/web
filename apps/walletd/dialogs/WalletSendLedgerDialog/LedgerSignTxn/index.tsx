import { Paragraph, Button, Text } from '@siafoundation/design-system'
import { TransactionLayout } from './TransactionLayout'

export function LedgerSignTxn({
  waitingForUser,
  isConnected,
  isSigned,
  sign,
}: {
  waitingForUser: boolean
  isConnected: boolean
  isSigned: boolean
  sign: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      {isSigned ? (
        <TransactionLayout
          isConnected={isConnected}
          isSigned={isSigned}
          title="Transaction"
        />
      ) : isConnected && waitingForUser ? (
        <TransactionLayout
          isConnected={isConnected}
          isSigned={isSigned}
          title="Transaction"
          details={
            <div className="flex flex-col gap-1">
              <Text>Please confirm on device...</Text>
              <Paragraph size="14" color="subtle">
                To continue, approve signature on device.
              </Paragraph>
            </div>
          }
        />
      ) : isConnected ? (
        <TransactionLayout
          isConnected={isConnected}
          isSigned={isSigned}
          title="Transaction"
          actions={
            <Button size="small" onClick={sign}>
                Sign
              </Button>
          }
        />
      ) : (
        <TransactionLayout
          isConnected={isConnected}
          isSigned={isSigned}
          title="Transaction"
          details={
            <div className="flex flex-col gap-1">
              <Paragraph size="14" color="subtle">
                Connect device to start signing.
              </Paragraph>
            </div>
          }
        />
      )}
    </div>
  )
}
