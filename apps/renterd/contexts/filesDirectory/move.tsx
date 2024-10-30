import { ObjectData } from '../filesManager/types'
import { useCallback, useMemo, useState } from 'react'
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
  DragCancelEvent,
} from '@dnd-kit/core'
import { FullPathSegments, getDirectorySegmentsFromPath } from '../../lib/paths'
import { useObjectsRename } from '@siafoundation/renterd-react'
import { MultiSelect, triggerErrorToast } from '@siafoundation/design-system'
import {
  getMoveFileDestinationDirectory,
  getMoveFileOperations,
} from '../../lib/rename'

type Props = {
  multiSelect: MultiSelect<ObjectData>
  activeDirectory: FullPathSegments
  setActiveDirectory: (
    func: (directory: FullPathSegments) => FullPathSegments
  ) => void
  dataset?: ObjectData[]
  refresh: () => void
}

const navigationDelay = 500

export function useMove({
  multiSelect,
  dataset,
  activeDirectory,
  setActiveDirectory,
  refresh,
}: Props) {
  const [draggingObjects, setDraggingObjects] = useState<
    ObjectData[] | undefined
  >(undefined)
  const [, setNavTimeout] = useState<NodeJS.Timeout>()
  const rename = useObjectsRename()

  const moveFiles = useCallback(
    async (paths: string[], destinationPath: string) => {
      if (!paths.length) {
        return
      }
      const moveOperations = getMoveFileOperations(paths, destinationPath)

      for (const operation of moveOperations) {
        const { bucket, from, to, mode } = operation
        const response = await rename.post({
          payload: {
            force: false,
            bucket,
            from,
            to,
            mode,
          },
        })
        if (response.error) {
          triggerErrorToast({
            title: 'Error moving files',
            body: response.error,
          })
        }
      }
      refresh()
      multiSelect.deselectAll()
    },
    [refresh, rename, multiSelect]
  )

  const moveSelectedFilesOperationCount = useMemo(() => {
    const destinationPath = getMoveFileDestinationDirectory(activeDirectory)
    return getMoveFileOperations(multiSelect.selectedIds, destinationPath)
      .length
  }, [multiSelect.selectedIds, activeDirectory])

  const moveSelectedFiles = useCallback(async () => {
    if (!multiSelect.selectedIds.length) {
      return
    }
    const paths = multiSelect.selectedIds
    const destinationPath = getMoveFileDestinationDirectory(activeDirectory)
    moveFiles(paths, destinationPath)
  }, [multiSelect.selectedIds, activeDirectory, moveFiles])

  const moveDraggedFiles = useCallback(
    async (e: DragEndEvent) => {
      if (!draggingObjects) {
        return
      }
      const paths = draggingObjects.map((o) => o.path)
      const destinationPath = getMoveFileDestinationDirectory(
        activeDirectory,
        e
      )
      moveFiles(paths, destinationPath)
    },
    [draggingObjects, activeDirectory, moveFiles]
  )

  const delayedNavigation = useCallback(
    (directory?: FullPathSegments) => {
      if (!directory) {
        setNavTimeout((t) => {
          if (t) {
            clearTimeout(t)
          }
          return undefined
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
    (e: { collisions: { id: string | number }[] | null }) => {
      if (!e.collisions?.length) {
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
      // If an object included in active multi-selection is dragged,
      // drag the selection.
      const id = String(e.active.id)
      if (multiSelect.selectedIds.includes(id)) {
        setDraggingObjects(
          Object.entries(multiSelect.selection).map(([, obj]) => obj)
        )
      } else {
        const ob = dataset?.find((d) => d.id === e.active.id)
        setDraggingObjects(ob ? [ob] : undefined)
      }
    },
    [dataset, setDraggingObjects, multiSelect]
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
      setDraggingObjects(undefined)
      moveDraggedFiles(e)
    },
    [setDraggingObjects, delayedNavigation, moveDraggedFiles]
  )

  const onDragCancel = useCallback(
    async (e: DragCancelEvent) => {
      delayedNavigation(undefined)
      setDraggingObjects(undefined)
    },
    [setDraggingObjects, delayedNavigation]
  )

  return {
    onDragEnd,
    onDragOver,
    onDragCancel,
    onDragMove,
    onDragStart,
    draggingObjects,
    moveSelectedFiles,
    moveSelectedFilesOperationCount,
  }
}
