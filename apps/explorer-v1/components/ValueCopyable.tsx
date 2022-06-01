import {
  Copy16,
  Copy24,
  copyToClipboard,
  CSS,
  Flex,
  IconButton,
  NextLink,
  Text,
} from '@siafoundation/design-system'
import { EntityType, getEntityTypeLabel } from '../config/types'
import { getHrefForType } from '../lib/utils'

type Props = {
  value?: string
  displayValue?: string
  type: EntityType | string
  size?: '14' | '24'
  maxLength?: number
  color?: React.ComponentProps<typeof Text>['color']
  css?: CSS
}

export function ValueCopyable({
  value,
  displayValue,
  type,
  maxLength = 20,
  size = '14',
  color = 'contrast',
  css,
}: Props) {
  const href = getHrefForType(type, value)

  const renderValue = displayValue || value

  const label = `${renderValue.slice(0, maxLength)}${
    renderValue.length > maxLength ? '...' : ''
  }`
  return (
    <Flex gap="0-5" align="center" css={css}>
      <Text size={size} weight="semibold" color={color}>
        {href ? (
          <NextLink href={href} underline="hover">
            {label}
          </NextLink>
        ) : (
          label
        )}
      </Text>
      <IconButton
        size="0"
        onClick={() =>
          copyToClipboard(value, getEntityTypeLabel(type as EntityType) || type)
        }
      >
        {size === '14' ? <Copy16 /> : <Copy24 />}
      </IconButton>
    </Flex>
  )
}
