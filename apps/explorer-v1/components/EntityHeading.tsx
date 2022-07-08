import {
  Copy24,
  copyToClipboard,
  Flex,
  Heading,
  IconButton,
  NextLink,
} from '@siafoundation/design-system'
import { NvgEntityType, getNvgEntityTypeLabel } from '../config/navigatorTypes'
import { upperFirst } from 'lodash'

type Props = {
  label: string
  type: NvgEntityType
  value: string
  href: string
}

export function EntityHeading({ label, type, value, href }: Props) {
  return (
    <Flex gap="0-5" align="center" css={{ overflow: 'hidden' }}>
      <Heading css={{ display: 'inline' }} ellipsis>
        {upperFirst(label)}{' '}
        <NextLink href={href} underline="hover">
          {type === 'block'
            ? Number(value).toLocaleString()
            : value.slice(0, 15)}
          {value.length > 20 ? '...' : ''}
        </NextLink>
      </Heading>
      <IconButton
        size="0"
        onClick={() => copyToClipboard(value, getNvgEntityTypeLabel(type))}
      >
        <Copy24 />
      </IconButton>
    </Flex>
  )
}
