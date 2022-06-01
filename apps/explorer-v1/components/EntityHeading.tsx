import {
  Copy24,
  copyToClipboard,
  Flex,
  Heading,
  IconButton,
  NextLink,
} from '@siafoundation/design-system'
import { EntityType, getEntityTypeLabel } from '../config/types'
import { upperFirst } from 'lodash'

type Props = {
  label: string
  type: EntityType
  value: string
  href: string
}

export function EntityHeading({ label, type, value, href }: Props) {
  return (
    <Flex gap="0-5" align="center">
      <Heading css={{ display: 'inline' }}>
        {upperFirst(label)}{' '}
        <NextLink href={href} underline="hover">
          {type === 'block'
            ? Number(value).toLocaleString()
            : value.slice(0, 20)}
          {value.length > 20 ? '...' : ''}
        </NextLink>
      </Heading>
      <IconButton
        size="0"
        onClick={() => copyToClipboard(value, getEntityTypeLabel(type))}
      >
        <Copy24 />
      </IconButton>
    </Flex>
  )
}
