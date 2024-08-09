'use client'

import {
  copyToClipboard,
  Heading,
  humanId,
  Button,
  Link,
} from '@siafoundation/design-system'
import { Copy16 } from '@siafoundation/react-icons'
import { EntityType } from '@siafoundation/units'
import { upperFirst } from '@technically/lodash'

type Props = {
  label: string
  type: EntityType
  value: string
  href: string
}

export function EntityHeading({ label, type, value, href }: Props) {
  return (
    <div className="flex gap-1 items-center pr-1 py-1 overflow-hidden">
      <Heading className="inline" ellipsis>
        {upperFirst(label)}{' '}
        <Link href={href} underline="hover">
          {type === 'block' && Number(value).toLocaleString()}
          {type !== 'block' && humanId(value, 15)}
        </Link>
      </Heading>
      <Button
        variant="ghost"
        size="none"
        onClick={() => copyToClipboard(value, type)}
      >
        <Copy16 />
      </Button>
    </div>
  )
}
