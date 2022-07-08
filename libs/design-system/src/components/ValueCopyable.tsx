import {
  Copy16,
  Copy20,
  copyToClipboard,
  CSS,
  Flex,
  IconButton,
  NextLink,
  Text,
} from '../'

type Props = {
  value: string
  displayValue?: string
  label: string
  href?: string
  size?: React.ComponentProps<typeof Text>['size']
  maxLength?: number
  color?: React.ComponentProps<typeof Text>['color']
  css?: CSS
}

export function ValueCopyable({
  value,
  displayValue,
  label,
  href,
  maxLength = 12,
  size = '14',
  color = 'contrast',
  css,
}: Props) {
  const renderValue = displayValue || value

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
      <IconButton size="0" onClick={() => copyToClipboard(value, label)}>
        {size === '14' ? <Copy16 /> : <Copy20 />}
      </IconButton>
    </Flex>
  )
}
