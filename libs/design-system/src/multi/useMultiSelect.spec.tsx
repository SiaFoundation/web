import { renderHook, act } from '@testing-library/react'
import { useMultiSelect } from './useMultiSelect'
import { MouseEvent } from 'react'

interface Item {
  id: string
}

describe('useMultiSelect hook', () => {
  const dataset: Item[] = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]

  test('should select an item when onSelect is called', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('1', mockEvent)
    })

    expect(result.current.selectionMap).toHaveProperty('1')
    expect(result.current.selectionCount).toBe(1)
  })

  test('should deselect an item when onSelect is called on a selected item', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('1', mockEvent)
      result.current.onSelect('1', mockEvent)
    })

    expect(result.current.selectionMap).not.toHaveProperty('1')
    expect(result.current.selectionCount).toBe(0)
  })

  test('should select a range of items when shiftKey is held', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      const firstClickEvent = {
        shiftKey: false,
      } as MouseEvent<HTMLButtonElement>
      const shiftClickEvent = {
        shiftKey: true,
      } as MouseEvent<HTMLButtonElement>

      result.current.onSelect('2', firstClickEvent)
      result.current.onSelect('4', shiftClickEvent)
    })

    expect(Object.keys(result.current.selectionMap)).toEqual(['2', '3', '4'])
    expect(result.current.selectionCount).toBe(3)
  })

  test('should select all items on the page when onSelectPage is called', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      result.current.onSelectPage()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
    ])
    expect(result.current.selectionCount).toBe(5)
    expect(result.current.isPageAllSelected).toBe(true)
  })

  test('should deselect all items on the page when onSelectPage is called again', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      result.current.onSelectPage()
      result.current.onSelectPage()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([])
    expect(result.current.selectionCount).toBe(0)
    expect(result.current.isPageAllSelected).toBe(false)
  })

  test('should return indeterminate when some items are selected', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('1', mockEvent)
      result.current.onSelect('3', mockEvent)
    })

    expect(result.current.isPageAllSelected).toBe('indeterminate')
  })

  test('should deselect specific items when deselect is called', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      result.current.onSelectPage()
      result.current.deselect(['2', '4'])
    })

    expect(Object.keys(result.current.selectionMap)).toEqual(['1', '3', '5'])
    expect(result.current.selectionCount).toBe(3)
  })

  test('should deselect all items when deselectAll is called', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      result.current.onSelectPage()
      result.current.deselectAll()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([])
    expect(result.current.selectionCount).toBe(0)
    expect(result.current.isPageAllSelected).toBe(false)
  })

  test('should handle shift-click selection upwards', () => {
    const { result } = renderHook(() => useMultiSelect<Item>(dataset))

    act(() => {
      const firstClickEvent = {
        shiftKey: false,
      } as MouseEvent<HTMLButtonElement>
      const shiftClickEvent = {
        shiftKey: true,
      } as MouseEvent<HTMLButtonElement>

      result.current.onSelect('4', firstClickEvent)
      result.current.onSelect('2', shiftClickEvent)
    })

    expect(Object.keys(result.current.selectionMap)).toEqual(['2', '3', '4'])
    expect(result.current.selectionCount).toBe(3)
  })
})

describe('useMultiSelect hook across pagination', () => {
  // Full dataset across all pages.
  const fullDataset: Item[] = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ]

  // Simulated pages.
  const pageSize = 5
  const page1 = fullDataset.slice(0, pageSize)
  const page2 = fullDataset.slice(pageSize)

  test('should preserve selections across pages', () => {
    const { result, rerender } = renderHook(
      ({ dataset }) => useMultiSelect<Item>(dataset),
      {
        initialProps: { dataset: page1 },
      }
    )

    // Select items on page 1.
    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('2', mockEvent)
      result.current.onSelect('4', mockEvent)
    })

    expect(Object.keys(result.current.selectionMap)).toEqual(['2', '4'])
    expect(result.current.selectionCount).toBe(2)
    expect(result.current.isPageAllSelected).toBe('indeterminate')

    // Move to page 2.
    rerender({ dataset: page2 })

    // Selections from page 1 should persist.
    expect(Object.keys(result.current.selectionMap)).toEqual(['2', '4'])
    expect(result.current.selectionCount).toBe(2)

    // Select items on page 2.
    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('7', mockEvent)
    })

    expect(Object.keys(result.current.selectionMap)).toEqual(['2', '4', '7'])
    expect(result.current.selectionCount).toBe(3)
    expect(result.current.isPageAllSelected).toBe('indeterminate')
  })

  test('onSelectPage should select/deselect items only on the current page', () => {
    const { result, rerender } = renderHook(
      ({ dataset }) => useMultiSelect<Item>(dataset),
      {
        initialProps: { dataset: page1 },
      }
    )

    // Select all items on page 1.
    act(() => {
      result.current.onSelectPage()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
    ])
    expect(result.current.selectionCount).toBe(5)
    expect(result.current.isPageAllSelected).toBe(true)

    // Move to page 2.
    rerender({ dataset: page2 })

    // Page 2 items should not be selected.
    expect(result.current.isPageAllSelected).toBe(false)

    // Select all items on page 2.
    act(() => {
      result.current.onSelectPage()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
    ])
    expect(result.current.selectionCount).toBe(10)
    expect(result.current.isPageAllSelected).toBe(true)

    // Deselect all items on page 2.
    act(() => {
      result.current.onSelectPage()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
    ])
    expect(result.current.selectionCount).toBe(5)
    expect(result.current.isPageAllSelected).toBe(false)

    // Move back to page 1.
    rerender({ dataset: page1 })

    expect(result.current.isPageAllSelected).toBe(true)
  })

  test('deselectAll should clear selections across all pages', () => {
    const { result, rerender } = renderHook(
      ({ dataset }) => useMultiSelect<Item>(dataset),
      {
        initialProps: { dataset: page1 },
      }
    )

    // Select items on page 1.
    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('2', mockEvent)
    })

    // Move to page 2.
    rerender({ dataset: page2 })

    // Select items on page 2.
    act(() => {
      const mockEvent = { shiftKey: false } as MouseEvent<HTMLButtonElement>
      result.current.onSelect('7', mockEvent)
    })

    expect(Object.keys(result.current.selectionMap)).toEqual(['2', '7'])
    expect(result.current.selectionCount).toBe(2)

    // Deselect all selections.
    act(() => {
      result.current.deselectAll()
    })

    expect(Object.keys(result.current.selectionMap)).toEqual([])
    expect(result.current.selectionCount).toBe(0)
    expect(result.current.isPageAllSelected).toBe(false)

    // Move back to page 1 and check selections.
    rerender({ dataset: page1 })
    expect(result.current.isPageAllSelected).toBe(false)
  })
})
