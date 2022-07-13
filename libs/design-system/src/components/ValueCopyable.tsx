import {
  Copy16,
  Copy20,
  copyToClipboard,
  CSS,
  Flex,
  IconButton,
  NextLink,
  stripPrefix,
  Text,
} from '../'
import { EntityType, getEntityTypeLabel } from '../lib/entityTypes'

type Props = {
  value: string
  displayValue?: string
  type?: EntityType
  label?: string
  href?: string
  size?: React.ComponentProps<typeof Text>['size']
  maxLength?: number
  color?: React.ComponentProps<typeof Text>['color']
  css?: CSS
}

export function ValueCopyable({
  value,
  displayValue,
  type,
  label: customLabel,
  href,
  maxLength: customMaxLength,
  size = '14',
  color = 'contrast',
  css,
}: Props) {
  const label = customLabel || getEntityTypeLabel(type)
  const maxLength = customMaxLength || (type === 'ip' ? 20 : 12)
  const cleanValue = stripPrefix(value)
  const renderValue = displayValue || cleanValue

  const text = `${renderValue?.slice(0, maxLength)}${
    (renderValue?.length || 0) > maxLength ? '...' : ''
  }`
  return (
    <Flex gap="0-5" align="center" css={css}>
      <Text size={size} weight="semibold" color={color}>
        {href ? (
          <NextLink href={href} underline="hover">
            {text}
          </NextLink>
        ) : (
          text
        )}
      </Text>
      <IconButton
        size="0"
        onClick={(e) => {
          e.stopPropagation()
          copyToClipboard(cleanValue, label)
        }}
      >
        {size === '14' ? <Copy16 /> : <Copy20 />}
      </IconButton>
    </Flex>
  )
}
