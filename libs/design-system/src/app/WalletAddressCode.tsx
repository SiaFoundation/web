import { Heading } from '../core/Heading'
import { Text } from '../core/Text'
import { ValueCopyable } from '../components/ValueCopyable'
import QRCode from 'react-qr-code'
import { useCallback } from 'react'
import { copyToClipboard } from '../lib/clipboard'

type Props = {
  title?: string
  description?: string
  address: string
}

export function WalletAddressCode({ title, description, address }: Props) {
  const copy = useCallback(() => {
    copyToClipboard(address, 'address')
  }, [address])

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {title && (
        <Heading size="20" font="mono">
          {title}
        </Heading>
      )}
      {description && <Text>{description}</Text>}
      <div className="relative p-[5px] bg-white h-[210px] w-[210px] hover:outline hover:outline-4 hover:outline-blue-500">
        <div onClick={copy} className="absolute cursor-pointer">
          <QRCode size={200} value={address} />
        </div>
      </div>
      <ValueCopyable type="address" value={address} />
    </div>
  )
}
