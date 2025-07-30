'use client'

import { mapValues } from '@technically/lodash'
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

export type MultiSelectRow = { id: string }

type SelectionRow<Row> = {
  index: number
  row: Row
}

export type MultiSelect<Row extends MultiSelectRow> = ReturnType<
  typeof useMultiSelect<Row>
>

/**
 * ### normal click (single select):
 *
 * - The selection is reduced to the clicked row, and the range selection anchor is updated.
 * - Clicking the only selected row does not deselect it.
 *
 * ### ctrl/cmd-click (toggle select):
 *
 * - Toggles selection of an individual row without affecting others.
 * - If selected, updates the anchor to that row.
 * - If deselected, the anchor is updated to the nearest selected index, first checking higher indices, then lower. If no index is found reset the anchor.
 *
 * ### shift-click (range select):
 *
 * - Always select the full continuous range between the anchor and the clicked row, deselect all rows between the anchor and the last range end from the same anchor.
 * - Do not update the anchor on shift-click, unless there is none set yet.
 * - If no anchor is set, the range select will use the top row as the anchor and set the range end to the selected row.
 *
 * ### anchor
 *
 * - Whenever the anchor is updated, the range end is reset.
 * - Whenever the anchor is reset the range end is also reset.
 *
 * @param dataset The current visible page of row data that the user cna interact with.
 */
export function useMultiSelect<Row extends MultiSelectRow>(dataset?: Row[]) {
  const [selectionMap, setSelectionMap] = useState<
    Record<string, SelectionRow<Row>>
  >({})
  const selectedIds = useMemo(() => Object.keys(selectionMap), [selectionMap])
  const selectedList = useMemo(
    () =>
      Object.entries(selectionMap)
        .map(([_, s]) => s)
        .sort((a, b) => a.index - b.index),
    [selectionMap],
  )
  const [[anchor, rangeEnd], _setAnchor] = useState<
    | [SelectionRow<Row>, SelectionRow<Row>]
    | [SelectionRow<Row>, undefined]
    | [undefined, undefined]
  >([undefined, undefined])

  const resetAnchor = useCallback(() => {
    _setAnchor([undefined, undefined])
  }, [])

  const setAnchor = useCallback(
    (anchor: SelectionRow<Row>, rangeEnd: SelectionRow<Row> | undefined) => {
      _setAnchor([anchor, rangeEnd])
    },
    [],
  )

  // Page change could be pagination, refetch with new results, filtering, etc.
  const datasetKey = useMemo(
    () => dataset?.map((d) => d.id).join(','),
    [dataset],
  )
  // Reset anchor when page changes.
  useEffect(() => {
    resetAnchor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetKey])

  const onSelect = useCallback(
    (id: string, e?: MouseEvent<HTMLElement>) => {
      if (!dataset) {
        return
      }

      const idx = dataset.findIndex((d) => d.id === id)
      if (idx === -1) {
        return
      }

      const currentRow = dataset[idx]
      const currentSelectionRow = { row: currentRow, index: idx }
      const isCtrl = !!e?.ctrlKey || !!e?.metaKey
      const isShift = !!e?.shiftKey

      let nextSelection = { ...selectionMap }

      // ctrl-click: toggle row.
      if (isCtrl) {
        if (nextSelection[currentRow.id]) {
          delete nextSelection[currentRow.id]
          // ctrl-deselect set the anchor to the nearest selected index, first
          // checking higher indicies, then lower. If no index is found reset
          // the anchor to none.
          const nextAnchor = findNextAnchor(selectedList, idx)
          if (!nextAnchor) {
            resetAnchor()
          } else {
            setAnchor(nextAnchor, undefined)
          }
        } else {
          nextSelection[currentRow.id] = currentSelectionRow
          setAnchor(currentSelectionRow, undefined)
        }
        setSelectionMap(nextSelection)
        return
      }

      // shift-click: select range.
      if (isShift) {
        const currentAnchorOrDefault = anchor || {
          row: dataset[0],
          index: 0,
        }

        // If there was a previous anchor range end, deselect it.
        if (rangeEnd) {
          const start = Math.min(currentAnchorOrDefault.index, rangeEnd.index)
          const end = Math.max(currentAnchorOrDefault.index, rangeEnd.index)
          for (let i = start; i <= end; i++) {
            const row = dataset[i]
            delete nextSelection[row.id]
          }
        }
        const start = Math.min(currentAnchorOrDefault.index, idx)
        const end = Math.max(currentAnchorOrDefault.index, idx)
        for (let i = start; i <= end; i++) {
          const row = dataset[i]
          nextSelection[row.id] = {
            row,
            index: i,
          }
        }

        // If no anchor is set yet, set the anchor to the clicked row.
        if (!anchor) {
          setAnchor(currentSelectionRow, {
            row: dataset[0],
            index: 0,
          })
        } else {
          setAnchor(anchor, currentSelectionRow)
        }
        setSelectionMap(nextSelection)
        return
      }

      // normal click.
      // Reduce selection to the clicked row.
      nextSelection = {
        [currentRow.id]: currentSelectionRow,
      }
      setAnchor(currentSelectionRow, undefined)
      setSelectionMap(nextSelection)
    },
    [
      dataset,
      selectionMap,
      setAnchor,
      selectedList,
      resetAnchor,
      anchor,
      rangeEnd,
    ],
  )

  const isPageAllSelected = useMemo(
    () => getIsPageAllSelected({ dataset, selectionMap }),
    [dataset, selectionMap],
  )

  const someSelectedRowsOutsideCurrentPage = useMemo(() => {
    if (!dataset) {
      return selectedIds.length > 0
    }
    return selectedIds.some((id) => !dataset.some((datum) => datum.id === id))
  }, [dataset, selectedIds])

  const someSelectedOnCurrentPage = useMemo(() => {
    if (!dataset) {
      return false
    }
    return dataset.some((datum) => selectionMap[datum.id])
  }, [dataset, selectionMap])

  const onSelectPage = useCallback(() => {
    if (!dataset) {
      return
    }
    setSelectionMap((prev) => {
      const newSelection = { ...prev }
      const allState = getIsPageAllSelected({ dataset, selectionMap: prev })
      if (allState === false || allState === 'indeterminate') {
        dataset.forEach((datum, i) => {
          newSelection[datum.id] = {
            row: datum,
            index: i,
          }
        })
      } else {
        dataset.forEach((datum) => {
          delete newSelection[datum.id]
        })
      }
      return newSelection
    })
  }, [dataset])

  const deselect = useCallback(
    (ids: string[]) => {
      setSelectionMap((prev) => {
        const newSelection = { ...prev }
        ids.forEach((id) => {
          delete newSelection[id]
        })
        return newSelection
      })
      if (ids.find((id) => id === anchor?.row.id)) {
        resetAnchor()
      }
    },
    [anchor?.row.id, resetAnchor],
  )

  const deselectAll = useCallback(() => {
    setSelectionMap({})
    resetAnchor()
  }, [resetAnchor])

  const selectionCount = useMemo(() => selectedIds.length, [selectedIds])

  const selection = useMemo(
    () => mapValues(selectionMap, (s) => s.row),
    [selectionMap],
  )

  return {
    onSelect,
    onSelectPage,
    selection,
    selectedIds,
    isPageAllSelected,
    selectionCount,
    someSelectedRowsOutsideCurrentPage,
    someSelectedOnCurrentPage,
    deselect,
    deselectAll,
  }
}

function getIsPageAllSelected<Row extends { id: string }>({
  dataset,
  selectionMap,
}: {
  dataset?: Row[]
  selectionMap: Record<string, { row: Row; index: number }>
}) {
  if (!dataset) return false
  const allSelected = dataset.every((d) => selectionMap[d.id])
  if (allSelected) return true
  const someSelected = dataset.some((d) => selectionMap[d.id])
  if (someSelected) return 'indeterminate' as const
  return false
}

/**
 * Find the nearest selected index, first checking higher indicies, then lower.
 * If no index is found return undefined.
 *
 * @param selectedList List of selected rows.
 * @param idx Index of the row to find the next anchor from.
 * @returns SelectionRow<Row> | undefined
 */
function findNextAnchor<Row extends MultiSelectRow>(
  selectedList: SelectionRow<Row>[],
  idx: number,
): SelectionRow<Row> | undefined {
  const nextHighest = selectedList.find((s) => s.index > idx)
  if (nextHighest) {
    return nextHighest
  } else {
    const nextLowest = [...selectedList].reverse().find((s) => s.index < idx)
    return nextLowest
  }
}
