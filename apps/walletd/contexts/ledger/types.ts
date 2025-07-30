import TransportWebBLE from '@ledgerhq/hw-transport-web-ble'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
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
      supported ? 'HID' : null,
    ),
    // USB is not supported by ledger or the sia app.
    // Attempting to use this transports results in the following error:
    // No WebUSB interface found for your Ledger device. Please upgrade
    // firmware or contact techsupport.
    // TransportWebUSB.isSupported().then((supported) =>
    //   supported ? 'USB' : null
    // ),
  ])

  return results.filter((t) => t)
}

async function checkIsBrave(): Promise<boolean> {
  return navigator['brave'] && (await navigator['brave'].isBrave())
}
