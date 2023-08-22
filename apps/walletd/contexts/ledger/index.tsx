import TransportWebBLE from '@ledgerhq/hw-transport-web-ble'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import Sia from '@siacentral/ledgerjs-sia'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

export type TransportType = 'USB' | 'HID' | 'Bluetooth'

function useLedgerMain() {
  const [device, setDevice] = useState<{
    type: TransportType
    sia: Sia
    publicKey0?: string
    address0?: string
    waitingForUser: boolean
    transport: {
      forget: () => void
      deviceModel: {
        productName: string
      }
      _disconnectEmitted: boolean
    }
  }>()
  const [error, setError] = useState<Error>()

  const disconnect = useCallback(() => {
    if (!device) {
      return
    }
    try {
      device.sia.close()
      setError(undefined)
    } catch (e) {
      console.log(e)
    }
    setDevice(undefined)
  }, [device])

  const connect = useCallback(async (type: TransportType) => {
    let transport = null

    try {
      switch (type) {
        case 'HID':
          transport = await TransportWebHID.openConnected()
          if (!transport) {
            transport = await TransportWebHID.create()
          }
          break
        case 'Bluetooth':
          transport = await TransportWebBLE.create()
          break
        case 'USB':
          transport = await TransportWebUSB.openConnected()
          if (!transport) {
            transport = await TransportWebUSB.create()
          }
          break
        default:
          throw new Error(`Unsupported transport method: ${type}`)
      }
      if (transport) {
        setError(undefined)
        const sia = new Sia(transport)
        setDevice({
          type,
          sia,
          transport,
          waitingForUser: false,
        })
      }
    } catch (e) {
      setError(e)
    }
  }, [])

  const verify = useCallback(async () => {
    if (!device) {
      setError(new Error('No device connected'))
      return
    }
    setDevice((d) => ({
      ...d,
      waitingForUser: true,
    }))
    try {
      const response = await device.sia.verifyPublicKey(0)
      setError(undefined)
      setDevice((d) => ({
        ...d,
        publicKey0: response.publicKey,
        address0: response.address,
        waitingForUser: false,
      }))
      return response
    } catch (e) {
      setDevice((d) => ({
        ...d,
        waitingForUser: false,
      }))
      setError(e)
    }
  }, [device])

  useEffect(() => {
    if (!device?.transport) {
      return
    }
    const interval = setInterval(async () => {
      if (device?.transport._disconnectEmitted) {
        setDevice(undefined)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [device?.transport])

  console.log(device)

  return {
    connect,
    verify,
    disconnect,
    device,
    error,
    setError,
  }
}

type State = ReturnType<typeof useLedgerMain>

const LedgerContext = createContext({} as State)
export const useLedger = () => useContext(LedgerContext)

type Props = {
  children: React.ReactNode
}

export function LedgerProvider({ children }: Props) {
  const state = useLedgerMain()
  return (
    <LedgerContext.Provider value={state}>{children}</LedgerContext.Provider>
  )
}
