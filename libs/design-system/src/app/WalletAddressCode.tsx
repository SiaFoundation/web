import QRCode from 'react-qr-code'
import { ValueCopyable } from '../components/ValueCopyable'
import { Heading } from '../core/Heading'
import { Text } from '../core/Text'

type Props = {
  title?: string
  description?: string
  address: string
}

export function WalletAddressCode({ title, description, address }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {title && (
        <Heading size="20" font="mono">
          {title}
        </Heading>
      )}
      {description && <Text>{description}</Text>}
      <div className="relative p-[5px] bg-white h-[210px] w-[210px]">
        <div className="absolute">
          <QRCode size={200} value={address} />
        </div>
      </div>
      <ValueCopyable type="address" value={address} />
    </div>
  )
}
