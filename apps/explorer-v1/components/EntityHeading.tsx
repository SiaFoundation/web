import {
  Copy24,
  copyToClipboard,
  Flex,
  Heading,
  humanId,
  Button,
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
          {type === 'block' && Number(value).toLocaleString()}
          {type !== 'block' && humanId(value, 15)}
        </NextLink>
      </Heading>
      <Button
        size="0"
        onClick={() => copyToClipboard(value, getNvgEntityTypeLabel(type))}
      >
        <Copy24 />
      </Button>
    </Flex>
  )
}
