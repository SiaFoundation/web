import { Fragment, useEffect, useRef } from 'react'
import { Text, ChevronRight16, ScrollArea } from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'

export function FilesBreadcrumbMenu() {
  const { activeDirectory, setActiveDirectory } = useFiles()
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
    <ScrollArea>
      <div className="flex gap-1 items-center h-full">
        <Text
          onClick={() => setActiveDirectory(() => [])}
          size="18"
          weight="semibold"
          className="flex items-center cursor-pointer"
          noWrap
        >
          Files
        </Text>
        {!!activeDirectory.length && (
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
  )
}
