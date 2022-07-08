import { Badge, Box, Flex, Text, Tooltip } from '@siafoundation/design-system'
import { humanDate, humanNumber } from '@siafoundation/sia-js'
import { useStatus } from '../hooks/useStatus'
import { NvgEntityTx, getNvgEntityTypeLabel } from '../config/navigatorTypes'
import { routes } from '../config/routes'
import { EntityHeading } from './EntityHeading'

type Props = {
  entity: NvgEntityTx
}

export function TxEntityHeader({ entity }: Props) {
  const { data } = entity
  const status = useStatus()
  const txHash = data[0].MasterHash
  const confirmations = Math.min(72, status.data?.lastblock - data[1].Height)
  const height = humanNumber(data[1].Height)
  const timestamp = humanDate(data[1].Timestamp * 1000, { time: true })

  return (
    <Flex justify="between" align="center" wrap="wrap" gapY="2">
      <EntityHeading
        label={getNvgEntityTypeLabel(entity.type)}
        type={entity.type}
        value={txHash}
        href={routes.tx.view.replace('[id]', txHash)}
      />
      <Flex gap="2" align="center" css={{ overflow: 'hidden' }}>
        <Tooltip content={timestamp}>
          <Text font="mono" color="subtle" ellipsis>
            {timestamp}
          </Text>
        </Tooltip>
        <Badge variant="accent">
          <Flex gap="1">
            <Tooltip content="Block height">
              <Box>{height}</Box>
            </Tooltip>
            <Box>|</Box>
            <Box>
              {confirmations === 72 ? '72+' : confirmations} confirmations
            </Box>
          </Flex>
        </Badge>
      </Flex>
    </Flex>
  )
}
