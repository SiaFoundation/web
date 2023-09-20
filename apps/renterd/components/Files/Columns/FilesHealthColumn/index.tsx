import { HoverCard, LoadingDots, Text } from '@siafoundation/design-system'
import { ObjectData } from '../../../../contexts/files/types'
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
          <Text color={color} className="flex cursor-pointer">
            {icon}
          </Text>
        }
      >
        <div className="z-10 flex flex-col -mx-1 overflow-hidden">
          <div className="flex justify-between gap-2 py-0.5 px-2">
            <Text size="12">{label}</Text>
            <Text size="12">{(displayHealth * 100).toFixed(0)}%</Text>
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
        <Text color={color} className="flex cursor-pointer">
          {icon}
        </Text>
      }
    >
      {/* important to separate contents so that each row does not trigger 1+n
      fetching */}
      <FilesHealthColumnContents {...props} />
    </HoverCard>
  )
}
