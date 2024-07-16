import { Button, Panel, Text, Tooltip } from '@siafoundation/design-system'
import {
  Bluetooth16,
  Close16,
  HidIcon,
  UsbIcon,
} from '@siafoundation/react-icons'
import { useLedger } from '../../contexts/ledger'

type Props = {
  title: string
  details?: React.ReactNode
  actions?: React.ReactNode
  shouldVerify?: boolean
}

export function LedgerLayout({ title, details, actions, shouldVerify }: Props) {
  const { device, disconnect } = useLedger()
  return (
    <Panel className="mt-1 pl-3 pr-2 py-2">
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1 justify-between items-center">
          <div className="flex items-center">
            {shouldVerify ? (
              <>
                {!device?.publicKey0 && (
                  <div className="relative w-2 h-2 mr-2">
                    <div className="absolute w-2 h-2 rounded-full bg-amber-400 animate-pingslow" />
                    <div className="absolute w-2 h-2 rounded-full bg-amber-500 border border-amber-400" />
                  </div>
                )}
                {!!device?.publicKey0 && (
                  <div className="relative w-2 h-2 mr-2">
                    <div className="absolute w-2 h-2 rounded-full bg-green-400 animate-pingslow" />
                    <div className="absolute w-2 h-2 rounded-full bg-green-500 border border-green-400" />
                  </div>
                )}
              </>
            ) : (
              <div className="relative w-2 h-2 mr-2">
                <div className="absolute w-2 h-2 rounded-full bg-green-400 animate-pingslow" />
                <div className="absolute w-2 h-2 rounded-full bg-green-500 border border-green-400" />
              </div>
            )}
            {device?.type === 'Bluetooth' && (
              <Tooltip content="Bluetooth">
                <Text weight="semibold" size="16">
                  <Bluetooth16 />
                </Text>
              </Tooltip>
            )}
            {device?.type === 'USB' && (
              <Tooltip content="USB">
                <Text weight="semibold" size="16">
                  <UsbIcon size={16} />
                </Text>
              </Tooltip>
            )}
            {device?.type === 'HID' && (
              <Tooltip content="HID">
                <Text weight="semibold" size="16">
                  <HidIcon size={16} />
                </Text>
              </Tooltip>
            )}
            <Text weight="semibold" size="16" className="ml-1">
              {title}
            </Text>
          </div>
          <div className="flex gap-1 justify-between items-center">
            {actions}
            {!!device && (
              <Button variant="ghost" onClick={disconnect}>
                <Close16 />
              </Button>
            )}
          </div>
        </div>
        {details}
      </div>
    </Panel>
  )
}
