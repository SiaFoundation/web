import { Panel, ScrollArea } from '@siafoundation/design-system'
import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
import {
  DirectorySelectCmd,
  volumesDirectorySelectPage,
} from './DirectorySelectCmd'
import { DirectorySelectEmpty } from './DirectorySelectCmd/DirectorySelectEmpty'

type Props = {
  defaultPath: string
  onChange: (path: string) => void
}

export function DirectorySelectMenu({ defaultPath, onChange }: Props) {
  const [path, setPath] = useState(defaultPath)

  useEffect(() => {
    onChange(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return (
    <Command label="Select volume" shouldFilter={false}>
      <Panel className="h-[200px] p-1 overflow-hidden">
        {/* key added because scroll bar height was glitching when number of results changed on windows */}
        <ScrollArea keyToResetScrollbars={path}>
          <Command.List>
            <Command.Empty>
              <DirectorySelectEmpty search={path} />
            </Command.Empty>
            <DirectorySelectCmd
              path={path}
              setPath={setPath}
              currentPage={volumesDirectorySelectPage}
            />
          </Command.List>
        </ScrollArea>
      </Panel>
    </Command>
  )
}
