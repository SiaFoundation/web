import TransportWebBLE from '@ledgerhq/hw-transport-web-ble'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import Sia from '@siacentral/ledgerjs-sia'

export type LedgerDevice = {
  type: TransportType
  sia: Sia
  publicKey0?: string
  address0?: string
  transport: {
    forget: () => void
    deviceModel: {
      productName: string
    }
    _disconnectEmitted: boolean
  }
}

export type TransportType = 'USB' | 'HID' | 'Bluetooth'

export async function getSupportedTransports() {
  const results = await Promise.all([
    TransportWebBLE.isSupported().then(async (supported) => {
      // Web Bluetooth API is globally disabled in Brave
      const isBrave = await checkIsBrave()
      return supported && !isBrave ? 'Bluetooth' : null
    }),
    TransportWebHID.isSupported().then((supported) =>
      supported ? 'HID' : null
    ),
    TransportWebUSB.isSupported().then((supported) =>
      supported ? 'USB' : null
    ),
  ])

  return results.filter((t) => t)
}

async function checkIsBrave(): Promise<boolean> {
  return navigator['brave'] && (await navigator['brave'].isBrave())
}
