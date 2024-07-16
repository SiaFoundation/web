import { Panel, ScrollArea } from '@siafoundation/design-system'
import type { SystemDirectoryResponse } from '@siafoundation/hostd-types'
import type { SWRError } from '@siafoundation/react-core'
import { Command } from 'cmdk'
import type { SWRResponse } from 'swr'
import {
  DirectorySelectCmd,
  volumesDirectorySelectPage,
} from './DirectorySelectCmd'

type Props = {
  path: string
  dir: SWRResponse<SystemDirectoryResponse, SWRError>
  onChange: (path: string) => void
}

export function DirectorySelectMenu({ path, dir, onChange }: Props) {
  return (
    <Command label="Select volume" shouldFilter={false}>
      <Panel className="h-[200px] p-1 overflow-hidden">
        {/* key added because scroll bar height was glitching when number of results changed on windows */}
        <ScrollArea keyToResetScrollbars={path}>
          <Command.List>
            <DirectorySelectCmd
              path={path}
              dir={dir}
              setPath={onChange}
              currentPage={volumesDirectorySelectPage}
            />
          </Command.List>
        </ScrollArea>
      </Panel>
    </Command>
  )
}
