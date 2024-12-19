import {
  DropdownMenuItem,
  copyToClipboard,
  DropdownMenuLeftSlot,
} from '@siafoundation/design-system'
import { Copy16 } from '@siafoundation/react-icons'
import { useObject } from '@siafoundation/renterd-react'
import { bucketAndKeyParamsFromPath } from '../../../lib/paths'

type Props = {
  path: string
}

// Separating out avoids fetching n objects metadata and only fetches the
// specific one when the user triggers the context menu.
export function CopyMetadataMenuItem({ path }: Props) {
  const obj = useObject({
    params: bucketAndKeyParamsFromPath(path),
    config: {
      swr: {
        dedupingInterval: 5000,
      },
    },
  })

  return (
    <DropdownMenuItem
      disabled={!obj.data}
      onSelect={() => {
        if (obj.data) {
          copyToClipboard(JSON.stringify(obj.data, null, 2), 'object metadata')
        }
      }}
    >
      <DropdownMenuLeftSlot>
        <Copy16 />
      </DropdownMenuLeftSlot>
      Copy metadata
    </DropdownMenuItem>
  )
}
