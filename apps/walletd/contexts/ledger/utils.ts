import TransportWebBLE from '@ledgerhq/hw-transport-web-ble'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'

export async function getSupportedTransports() {
  const results = await Promise.all([
    TransportWebHID.isSupported().then((supported) =>
      supported ? 'HID' : null
    ),
    TransportWebUSB.isSupported().then((supported) =>
      supported ? 'USB' : null
    ),
    TransportWebBLE.isSupported().then(async (supported) =>
      // Web Bluetooth API is globally disabled in Brave
      supported && !isBrave() ? 'Bluetooth' : null
    ),
  ])

  return results.filter((t) => t)
}

async function isBrave(): Promise<boolean> {
  return navigator['brave'] && (await navigator['brave'].isBrave())
}
