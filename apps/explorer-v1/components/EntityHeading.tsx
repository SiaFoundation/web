import {
  Copy24,
  copyToClipboard,
  Heading,
  humanId,
  Button,
  Link,
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
    <div className="flex gap-1 items-center overflow-hidden">
      <Heading className="inline" ellipsis>
        {upperFirst(label)}{' '}
        <Link href={href} underline="hover">
          {type === 'block' && Number(value).toLocaleString()}
          {type !== 'block' && humanId(value, 15)}
        </Link>
      </Heading>
      <Button
        size="small"
        onClick={() => copyToClipboard(value, getNvgEntityTypeLabel(type))}
      >
        <Copy24 />
      </Button>
    </div>
  )
}
