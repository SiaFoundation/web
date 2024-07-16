import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { triggerErrorToast } from '@siafoundation/design-system'
import { useObjectRename } from '@siafoundation/renterd-react'
import { useCallback, useState } from 'react'
import {
  type FullPathSegments,
  getDirectorySegmentsFromPath,
} from '../../lib/paths'
import { getMoveFileRenameParams } from '../../lib/rename'
import type { ObjectData } from '../filesManager/types'

type Props = {
  activeDirectory: FullPathSegments
  setActiveDirectory: (
    func: (directory: FullPathSegments) => FullPathSegments,
  ) => void
  dataset?: ObjectData[] | null
  refresh: () => void
}

const navigationDelay = 500

export function useMove({
  dataset,
  activeDirectory,
  setActiveDirectory,
  refresh,
}: Props) {
  const [draggingObject, setDraggingObject] = useState<ObjectData | null>(null)
  const [, setNavTimeout] = useState<NodeJS.Timeout | null>(null)
  const rename = useObjectRename()

  const moveFiles = useCallback(
    async (e: DragEndEvent) => {
      const { bucket, from, to, mode } = getMoveFileRenameParams(
        e,
        activeDirectory,
      )
      if (from === to) {
        return
      }
      const response = await rename.post({
        payload: {
          force: false,
          bucket,
          from,
          to,
          mode,
        },
      })
      refresh()
      if (response.error) {
        triggerErrorToast({
          title: 'Error moving files',
          body: response.error,
        })
      }
    },
    [refresh, rename, activeDirectory],
  )

  const delayedNavigation = useCallback(
    (directory?: FullPathSegments) => {
      if (!directory) {
        setNavTimeout((t) => {
          if (t) {
            clearTimeout(t)
          }
          return null
        })
        return
      }
      const newTimeout = setTimeout(() => {
        setActiveDirectory(() => directory)
      }, navigationDelay)
      setNavTimeout((t) => {
        if (t) {
          clearTimeout(t)
        }
        return newTimeout
      })
    },
    [setNavTimeout, setActiveDirectory],
  )

  const scheduleNavigation = useCallback(
    (e: { collisions: { id: string | number }[] | null }) => {
      if (!e.collisions?.length) {
        delayedNavigation(undefined)
      } else {
        const path = e.collisions?.[0]?.id as string
        if (path === '..') {
          delayedNavigation(activeDirectory.slice(0, -1))
        } else {
          delayedNavigation(getDirectorySegmentsFromPath(path))
        }
      }
    },
    [delayedNavigation, activeDirectory],
  )

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      setDraggingObject(dataset?.find((d) => d.id === e.active.id) || null)
    },
    [dataset, setDraggingObject],
  )

  const onDragOver = useCallback(
    (e: DragOverEvent) => {
      scheduleNavigation(e)
    },
    [scheduleNavigation],
  )

  const onDragMove = useCallback(
    (e: DragMoveEvent) => {
      scheduleNavigation(e)
    },
    [scheduleNavigation],
  )

  const onDragEnd = useCallback(
    async (e: DragEndEvent) => {
      delayedNavigation(undefined)
      setDraggingObject(null)
      moveFiles(e)
    },
    [setDraggingObject, delayedNavigation, moveFiles],
  )

  const onDragCancel = useCallback(async () => {
    delayedNavigation(undefined)
    setDraggingObject(null)
  }, [setDraggingObject, delayedNavigation])

  return {
    onDragEnd,
    onDragOver,
    onDragCancel,
    onDragMove,
    onDragStart,
    draggingObject,
  }
}
