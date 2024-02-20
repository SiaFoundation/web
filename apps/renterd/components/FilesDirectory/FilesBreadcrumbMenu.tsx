import { Fragment, useEffect, useRef } from 'react'
import { Text, ScrollArea } from '@siafoundation/design-system'
import { ChevronRight16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../contexts/filesManager'
import { FilesExplorerModeButton } from '../Files/FilesExplorerModeButton'

export function FilesBreadcrumbMenu() {
  const { activeDirectory, setActiveDirectory } = useFilesManager()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => {
      clearTimeout(t)
    }
  }, [activeDirectory])

  return (
    <div className="flex gap-2 items-center h-full">
      <FilesExplorerModeButton />
      <ScrollArea>
        <div className="flex gap-1 items-center h-full">
          <Text
            onClick={() => setActiveDirectory(() => [])}
            size="18"
            weight="semibold"
            className="flex items-center cursor-pointer"
            noWrap
          >
            Buckets
          </Text>
          {activeDirectory.length > 0 && (
            <Text size="16" color="verySubtle" className="flex items-center">
              <ChevronRight16 />
            </Text>
          )}
          {activeDirectory.map((part, i) => {
            return (
              <Fragment key={part + i}>
                {i > 0 && (
                  <Text
                    size="16"
                    color="verySubtle"
                    className="flex items-center"
                  >
                    <ChevronRight16 />
                  </Text>
                )}
                <Text
                  onClick={() =>
                    setActiveDirectory((dirs) => dirs.slice(0, i + 1))
                  }
                  size="18"
                  weight="semibold"
                  className="flex items-center cursor-pointer"
                  noWrap
                >
                  {part}
                </Text>
              </Fragment>
            )
          })}
          <div ref={ref} />
        </div>
      </ScrollArea>
    </div>
  )
}
