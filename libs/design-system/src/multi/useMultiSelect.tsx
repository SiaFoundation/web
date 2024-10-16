'use client'

import { MouseEvent, useCallback, useMemo, useState } from 'react'

export function useMultiSelect<Item extends { id: string }>(dataset?: Item[]) {
  const [selectionMap, setSelectionMap] = useState<Record<string, Item>>({})
  const [, setLastSelectedItem] = useState<{
    item: Item
    index: number
  }>()

  const onSelect = useCallback(
    (id: string, e: MouseEvent<HTMLButtonElement>) => {
      if (!dataset) {
        return
      }
      const selectedItem = dataset.find((datum) => datum.id === id)
      const selectedIndex = dataset.findIndex((datum) => datum.id === id)
      if (!selectedItem || selectedIndex === -1) {
        return
      }
      const selected = {
        item: selectedItem,
        index: selectedIndex,
      }

      setSelectionMap((prevSelectionMap) => {
        const newSelection = { ...prevSelectionMap }
        setLastSelectedItem((prevSelection) => {
          // If shift click, select all items between current and last selection indices.
          if (e.shiftKey && prevSelection) {
            if (prevSelection.index < selected.index) {
              for (let i = prevSelection.index; i <= selected.index; i++) {
                const item = dataset[i]
                newSelection[item.id] = item
              }
            } else {
              for (let i = selected.index; i <= prevSelection.index; i++) {
                const item = dataset[i]
                newSelection[item.id] = item
              }
            }
            return selected // Update prevSelection
          }
          // If no shift click, just select or deselect the current item.
          if (newSelection[selected.item.id]) {
            delete newSelection[selected.item.id]
            return undefined // Reset prevSelection
          } else {
            newSelection[selected.item.id] = selected.item
            return selected // Update prevSelection
          }
        })
        return newSelection
      })
    },
    [dataset]
  )

  const isPageAllSelected = useMemo(() => {
    return getIsPageAllSelected({ dataset, selectionMap })
  }, [dataset, selectionMap])

  const onSelectPage = useCallback(() => {
    if (!dataset) {
      return
    }
    setSelectionMap((prevSelectionMap) => {
      const newSelection: Record<string, Item> = {
        ...prevSelectionMap,
      }
      const isPageAllSelected = getIsPageAllSelected({
        dataset,
        selectionMap: prevSelectionMap,
      })
      // If not all items are selected, add all the items.
      if (
        isPageAllSelected === false ||
        isPageAllSelected === 'indeterminate'
      ) {
        dataset.forEach((datum) => {
          newSelection[datum.id] = datum
        })
      } else {
        // If all items are selected, remove all the items.
        dataset.forEach((datum) => {
          delete newSelection[datum.id]
        })
      }
      return newSelection
    })
  }, [dataset])

  const deselect = useCallback((ids: string[]) => {
    setSelectionMap((prevSelectionMap) => {
      const newSelection: Record<string, Item> = {
        ...prevSelectionMap,
      }
      ids.forEach((id) => {
        delete newSelection[id]
      })
      return newSelection
    })
  }, [])

  const deselectAll = useCallback(() => {
    setSelectionMap({})
  }, [])

  const selectionCount = useMemo(
    () => Object.keys(selectionMap).length,
    [selectionMap]
  )

  return {
    onSelect,
    onSelectPage,
    selectionMap,
    isPageAllSelected,
    selectionCount,
    deselect,
    deselectAll,
  }
}

function getIsPageAllSelected<Item extends { id: string }>({
  dataset,
  selectionMap,
}: {
  dataset?: Item[]
  selectionMap: Record<string, Item>
}) {
  if (!dataset) {
    return false
  }
  if (dataset.every((datum) => selectionMap[datum.id])) {
    return true
  }
  if (dataset.some((datum) => selectionMap[datum.id])) {
    return 'indeterminate' as const
  }
  return false
}
