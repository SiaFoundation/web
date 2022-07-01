import {
  Avatar,
  Flex,
  Snowflake16,
  Text,
  Usb16,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { routes } from '../../config/routes'

type Props = {
  name: string
  sf?: string
  sc: string
  type: 'hot' | 'cold' | 'hw'
}

const colorMap = {
  hw: '$green4',
  cold: '$cyan4',
  hot: '$red4',
}

const variantMap: Record<
  string,
  React.ComponentProps<typeof Avatar>['variant']
> = {
  hw: 'green',
  cold: 'cyan',
  hot: 'red',
}

export function WalletButton({ name, sc, sf, type }: Props) {
  const router = useRouter()
  const color = colorMap[type]
  const variant = variantMap[type]
  const route = routes.wallet.view.replace('[id]', name)
  return (
    <Flex
      direction="column"
      gap="1-5"
      align="center"
      onClick={() => router.push(route)}
      css={{ position: 'relative', width: '100%', cursor: 'pointer' }}
    >
      {type !== 'hot' && (
        <Flex
          align="center"
          justify="center"
          css={{
            position: 'absolute',
            zIndex: 1,
            right: 0,
            top: '-5px',
            height: '25px',
            width: '25px',
            background: color,
            border: '1px solid $gray7',
            borderRadius: '$round',
          }}
        >
          {type === 'hw' ? <Usb16 /> : <Snowflake16 />}
        </Flex>
      )}
      <Avatar interactive fallback={name} variant={variant} />
      <Text size="10" weight="semibold">
        {sc} {sf && ` / ${sf}`}
      </Text>
    </Flex>
  )
}
