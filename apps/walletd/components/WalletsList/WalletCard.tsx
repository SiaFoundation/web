import {
  Button,
  Close16,
  Heading,
  Panel,
  Text,
  ValueSc,
} from '@siafoundation/design-system'
import {
  useWalletAddresses,
  useWalletBalance,
} from '@siafoundation/react-walletd'
import BigNumber from 'bignumber.js'
import { useDialog } from '../../contexts/dialog'
// import { routes } from '../../config/routes'
// import { useRouter } from 'next/router'

type Props = {
  name: string
  meta: Record<string, unknown>
}

export function WalletCard({ name, meta }: Props) {
  // const router = useRouter()
  const addresses = useWalletAddresses({
    params: {
      name,
    },
  })
  const balance = useWalletBalance({
    params: {
      name,
    },
  })
  const { openDialog } = useDialog()
  return (
    <Panel
      className="p-6 h-[200px] cursor-pointer"
      // onClick={() => router.push(routes.wallet.view.replace(':id', name))}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <Heading>{name}</Heading>
          <Button onClick={() => openDialog('walletRemove', { id: name })}>
            <Close16 />
          </Button>
        </div>
        {typeof meta.description === 'string' && (
          <Text>{meta.description}</Text>
        )}
        <Text>
          {Object.entries(addresses.data || {})
            .map(([address, meta]) => address)
            .join(', ')}
        </Text>
        <ValueSc value={new BigNumber(balance.data?.siacoins || 0)} />
      </div>
    </Panel>
  )
}
