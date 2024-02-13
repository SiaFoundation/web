import { ObjectData } from './types'
import { useCallback, useState } from 'react'
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
  DragCancelEvent,
} from '@dnd-kit/core'
import { FullPathSegments, getDirectorySegmentsFromPath } from './paths'
import { useObjectRename } from '@siafoundation/react-renterd'
import { triggerErrorToast } from '@siafoundation/design-system'
import { getMoveFileRenameParams } from './rename'

type Props = {
  activeDirectory: FullPathSegments
  setActiveDirectory: (
    func: (directory: FullPathSegments) => FullPathSegments
  ) => void
  dataset?: ObjectData[]
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
  const [, setNavTimeout] = useState<NodeJS.Timeout>()
  const rename = useObjectRename()

  const moveFiles = useCallback(
    async (e: DragEndEvent) => {
      const { bucket, from, to, mode } = getMoveFileRenameParams(
        e,
        activeDirectory
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
        triggerErrorToast(response.error)
      }
    },
    [refresh, rename, activeDirectory]
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
    [setNavTimeout, setActiveDirectory]
  )

  const scheduleNavigation = useCallback(
    (e: { collisions: { id: string | number }[] }) => {
      if (!e.collisions.length) {
        delayedNavigation(undefined)
      } else {
        const path = e.collisions?.[0].id as string
        if (path === '..') {
          delayedNavigation(activeDirectory.slice(0, -1))
        } else {
          delayedNavigation(getDirectorySegmentsFromPath(path))
        }
      }
    },
    [delayedNavigation, activeDirectory]
  )

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      setDraggingObject(dataset.find((d) => d.id === e.active.id) || null)
    },
    [dataset, setDraggingObject]
  )

  const onDragOver = useCallback(
    (e: DragOverEvent) => {
      scheduleNavigation(e)
    },
    [scheduleNavigation]
  )

  const onDragMove = useCallback(
    (e: DragMoveEvent) => {
      scheduleNavigation(e)
    },
    [scheduleNavigation]
  )

  const onDragEnd = useCallback(
    async (e: DragEndEvent) => {
      delayedNavigation(undefined)
      setDraggingObject(undefined)
      moveFiles(e)
    },
    [setDraggingObject, delayedNavigation, moveFiles]
  )

  const onDragCancel = useCallback(
    async (e: DragCancelEvent) => {
      delayedNavigation(undefined)
      setDraggingObject(undefined)
    },
    [setDraggingObject, delayedNavigation]
  )

  return {
    onDragEnd,
    onDragOver,
    onDragCancel,
    onDragMove,
    onDragStart,
    draggingObject,
  }
}
