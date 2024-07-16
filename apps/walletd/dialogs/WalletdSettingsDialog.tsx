import {
  Alert,
  Heading,
  Option,
  Paragraph,
  Select,
  SettingsDialog,
  Switch,
  Text,
  minutesInMilliseconds,
} from '@siafoundation/design-system'
import { Information16 } from '@siafoundation/react-icons'
import { useWallets } from '../contexts/wallets'

export type WalletdSettingsDialogParams = never

type Props = {
  params?: WalletdSettingsDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletdSettingsDialog({ open, onOpenChange }: Props) {
  const {
    walletAutoLockTimeout,
    setWalletAutoLockTimeout,
    setWalletAutoLockEnabled,
    walletAutoLockEnabled,
  } = useWallets()
  return (
    <SettingsDialog
      open={open}
      onOpenChange={onOpenChange}
      securityEl={
        <Alert>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Text>
                <Information16 />
              </Text>
              <Heading size="20" className="flex-1">
                Lock wallets
              </Heading>
              <Switch
                size="medium"
                checked={walletAutoLockEnabled}
                onCheckedChange={(val) => setWalletAutoLockEnabled(val)}
              />
              <Select
                disabled={!walletAutoLockEnabled}
                value={String(walletAutoLockTimeout)}
                onChange={(e) => {
                  setWalletAutoLockTimeout(Number(e.currentTarget.value))
                }}
              >
                <Option value={minutesInMilliseconds(5)}>5 minutes</Option>
                <Option value={minutesInMilliseconds(10)}>10 minutes</Option>
                <Option value={minutesInMilliseconds(20)}>20 minutes</Option>
                <Option value={minutesInMilliseconds(30)}>30 minutes</Option>
                <Option value={minutesInMilliseconds(60)}>1 hour</Option>
              </Select>
            </div>
            <Paragraph size="14">
              {`Automatically lock each wallet after a certain period of inactivity.`}
            </Paragraph>
          </div>
        </Alert>
      }
    />
  )
}
