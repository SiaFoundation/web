import { HoverCard, LoadingDots, Text } from '@siafoundation/design-system'
import type { ObjectData } from '../../../../contexts/filesManager/types'
import { useHealthLabel } from '../../../../hooks/useHealthLabel'
import { FilesHealthColumnContents } from './FilesHealthColumnContents'

export function FilesHealthColumn(props: ObjectData) {
  const { name, isUploading, type, health: _health, size } = props
  const isDirectory = type === 'directory'
  const { displayHealth, label, color, icon } = useHealthLabel({
    health: _health,
    size,
    isDirectory,
  })
  const displayPercent = `${(displayHealth * 100).toFixed(0)}%`
  if (isDirectory) {
    if (name === '..') {
      return null
    }
    return (
      <HoverCard
        rootProps={{
          openDelay: 100,
        }}
        trigger={
          <div className="flex items-center gap-1 cursor-pointer">
            <Text color={color}>{icon}</Text>
            <Text color="verySubtle" size="12">
              {displayPercent}
            </Text>
          </div>
        }
      >
        <div className="z-10 flex flex-col -mx-1 overflow-hidden">
          <div className="flex justify-between gap-2 py-0.5 px-2">
            <Text size="12">{label}</Text>
            <Text size="12">{displayPercent}</Text>
          </div>
        </div>
      </HoverCard>
    )
  }

  if (isUploading) {
    return <LoadingDots />
  }

  return (
    <HoverCard
      rootProps={{
        openDelay: 100,
      }}
      trigger={
        <div className="flex items-center gap-1 cursor-pointer">
          <Text color={color}>{icon}</Text>
          <Text color="verySubtle" size="12">
            {displayPercent}
          </Text>
        </div>
      }
    >
      {/* important to separate contents so that each row does not trigger 1+n
      fetching */}
      <FilesHealthColumnContents {...props} />
    </HoverCard>
  )
}
