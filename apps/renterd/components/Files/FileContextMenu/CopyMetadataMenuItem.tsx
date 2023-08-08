import {
  DropdownMenuItem,
  copyToClipboard,
  DropdownMenuLeftSlot,
  Copy16,
} from '@siafoundation/design-system'
import { useObject } from '@siafoundation/react-renterd'

type Props = {
  path: string
}

// Separating out avoids fetching n objects metadata and only fetches the
// specific one when the user triggers the context menu.
export function CopyMetadataMenuItem({ path }: Props) {
  const obj = useObject({
    params: {
      key: path.slice(1),
    },
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
          copyToClipboard(
            JSON.stringify(obj.data.object, null, 2),
            'object metadata'
          )
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
