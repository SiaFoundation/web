import { renderHook, act } from '@testing-library/react'
import { useMultiSelect } from './useMultiSelect'
import { MouseEvent } from 'react'

type Row = {
  id: string
}

const normalClick = {} as MouseEvent<HTMLButtonElement>
const shiftClick = { shiftKey: true } as MouseEvent<HTMLButtonElement>
const ctrlClick = { ctrlKey: true } as MouseEvent<HTMLButtonElement>

describe('useMultiSelect', () => {
  describe('core behaviour', () => {
    const dataset: Row[] = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
    ]

    describe('normal click', () => {
      test('selects a single row', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('1', normalClick)
        })
        expect(result.current.selectedIds).toEqual(['1'])
        expect(result.current.selectionCount).toBe(1)
      })

      test('retains the only selected row on second click', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('1', normalClick)
        })
        act(() => {
          result.current.onSelect('1', normalClick)
        })
        expect(result.current.selectedIds).toEqual(['1'])
        expect(result.current.selectionCount).toBe(1)
      })

      test('reduces selection to one row if multiple selected and clicked row is selected', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('4', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])
        act(() => {
          result.current.onSelect('3', normalClick)
        })
        expect(result.current.selectedIds).toEqual(['3'])
      })

      test('reduces selection to one row if multiple selected and clicked row is not selected', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('4', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])
        act(() => {
          result.current.onSelect('1', normalClick)
        })
        expect(result.current.selectedIds).toEqual(['1'])
      })
    })

    describe('shift click (range selection)', () => {
      test('if no anchor, use top row as anchor and select range', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('3', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '2', '3'])
        expect(result.current.selectionCount).toBe(3)
        act(() => {
          result.current.onSelect('2', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3'])
        expect(result.current.selectionCount).toBe(2)
      })

      test('selects a continuous range from anchor to clicked row', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('4', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])
        expect(result.current.selectionCount).toBe(3)
      })

      test('can select range upwards', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('4', normalClick)
        })
        act(() => {
          result.current.onSelect('2', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])
        expect(result.current.selectionCount).toBe(3)
      })

      test('multiple shift-clicks maintain same anchor until a normal click changes it', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('4', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])

        // Extend the range.
        act(() => {
          result.current.onSelect('5', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4', '5'])

        // Normal click resets anchor.
        act(() => {
          result.current.onSelect('1', normalClick)
        })
        expect(result.current.selectedIds).toEqual(['1'])

        // New shift-click range from new anchor.
        act(() => {
          result.current.onSelect('3', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '2', '3'])

        // Shift-click a selected row.
        act(() => {
          result.current.onSelect('2', shiftClick)
        })
        expect(result.current.selectedIds).toEqual(['1', '2'])
      })

      test('shift-click selects range and clears any previous range selection from the current anchor', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('3', normalClick)
        })
        act(() => {
          result.current.onSelect('1', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '2', '3'])

        // Shift-click a non-overlapping range.
        act(() => {
          result.current.onSelect('5', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['3', '4', '5'])
      })
    })

    describe('ctrl/cmd click (toggle)', () => {
      test('adds a new row or removes row without removing others', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('1', normalClick)
        })
        act(() => {
          result.current.onSelect('3', ctrlClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '3'])
        act(() => {
          result.current.onSelect('1', ctrlClick)
        })
        expect(result.current.selectedIds).toEqual(['3'])
      })
    })

    describe('ctrl/cmd click anchor', () => {
      test('deselect with remaining selection at a higher index', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('4', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])
        act(() => {
          result.current.onSelect('3', ctrlClick)
        })
        // Anchor will now be next selected index greater than that of id 3.
        // Anchor is now 4.
        act(() => {
          result.current.onSelect('5', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '4', '5'])
        act(() => {
          result.current.onSelect('1', shiftClick)
        })
        // Anchor is 4 and last shift end was 5. So 5 gets deselected.
        expect(result.current.selectedIds.sort()).toEqual(['1', '2', '3', '4'])
      })

      test('deselect with remaining selection at a lower index', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.deselectAll()
        })
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('4', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])
        act(() => {
          result.current.onSelect('3', ctrlClick)
        })
        act(() => {
          result.current.onSelect('4', ctrlClick)
        })
        // Anchor will now be next selected index smaller than that of id 3.
        act(() => {
          result.current.onSelect('5', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4', '5'])
        act(() => {
          result.current.onSelect('1', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '2'])
      })

      test('deselect last remaining selection', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.deselectAll()
        })
        act(() => {
          result.current.onSelect('2', normalClick)
        })
        act(() => {
          result.current.onSelect('2', ctrlClick)
        })
        // Anchor will now be reset to undefined. First shift-selection sets anchor
        // since there is none yet.
        act(() => {
          result.current.onSelect('3', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '2', '3'])
        act(() => {
          result.current.onSelect('2', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['2', '3'])
      })

      test('ctrl-click to select or deselect both reset the anchor', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('1', ctrlClick)
        })
        act(() => {
          result.current.onSelect('3', ctrlClick)
        })
        act(() => {
          result.current.onSelect('5', ctrlClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '3', '5'])
        act(() => {
          result.current.onSelect('3', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '3', '4', '5'])
        act(() => {
          result.current.onSelect('3', ctrlClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '4', '5'])
        act(() => {
          result.current.onSelect('1', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual([
          '1',
          '2',
          '3',
          '4',
          '5',
        ])
        act(() => {
          result.current.onSelect('5', shiftClick)
        })
        expect(result.current.selectedIds.sort()).toEqual(['4', '5'])
      })
    })

    describe('page selection', () => {
      test('onSelectPage selects all rows if not all selected, else deselects all', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelectPage()
        })
        expect(result.current.selectedIds.sort()).toEqual([
          '1',
          '2',
          '3',
          '4',
          '5',
        ])
        expect(result.current.selectionCount).toBe(5)
        expect(result.current.isPageAllSelected).toBe(true)

        // Deselect all by calling onSelectPage again.
        act(() => {
          result.current.onSelectPage()
        })
        expect(result.current.selectedIds).toEqual([])
        expect(result.current.selectionCount).toBe(0)
        expect(result.current.isPageAllSelected).toBe(false)
      })

      test('is indeterminate when some but not all rows are selected', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelect('1', normalClick)
          result.current.onSelect('3', normalClick)
        })
        expect(result.current.isPageAllSelected).toBe('indeterminate')
      })
    })

    describe('deselect and deselectAll', () => {
      test('deselect specific rows', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelectPage()
          result.current.deselect(['2', '4'])
        })
        expect(result.current.selectedIds.sort()).toEqual(['1', '3', '5'])
        expect(result.current.selectionCount).toBe(3)
      })

      test('deselectAll clears all', () => {
        const { result } = renderHook(() => useMultiSelect<Row>(dataset))
        act(() => {
          result.current.onSelectPage()
          result.current.deselectAll()
        })
        expect(result.current.selectedIds).toEqual([])
        expect(result.current.selectionCount).toBe(0)
        expect(result.current.isPageAllSelected).toBe(false)
      })
    })
  })

  describe('pagination and persistence', () => {
    const fullDataset: Row[] = [
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
    const pageSize = 5
    const page1 = fullDataset.slice(0, pageSize)
    const page2 = fullDataset.slice(pageSize)

    test('preserve selections across pages', () => {
      const { result, rerender } = renderHook(
        ({ dataset }) => useMultiSelect<Row>(dataset),
        { initialProps: { dataset: page1 } },
      )

      act(() => {
        result.current.onSelect('2', normalClick)
      })
      act(() => {
        result.current.onSelect('4', ctrlClick)
      })
      expect(result.current.selectedIds.sort()).toEqual(['2', '4'])
      expect(result.current.isPageAllSelected).toBe('indeterminate')

      rerender({ dataset: page2 })
      // Selections persist even after dataset changes.
      expect(result.current.selectedIds.sort()).toEqual(['2', '4'])

      act(() => {
        result.current.onSelect('7', ctrlClick)
      })
      expect(result.current.selectedIds.sort()).toEqual(['2', '4', '7'])
      expect(result.current.isPageAllSelected).toBe('indeterminate')
    })

    test('onSelectPage affects only current page', () => {
      const { result, rerender } = renderHook(
        ({ dataset }) => useMultiSelect<Row>(dataset),
        { initialProps: { dataset: page1 } },
      )

      // Select all on page 1.
      act(() => {
        result.current.onSelectPage()
      })
      expect(result.current.selectedIds.sort()).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
      ])
      expect(result.current.isPageAllSelected).toBe(true)

      // Switch to page 2.
      rerender({ dataset: page2 })
      expect(result.current.isPageAllSelected).toBe(false)

      // Select all on page 2 (now all 10 are selected).
      act(() => {
        result.current.onSelectPage()
      })
      expect(result.current.selectedIds.sort()).toEqual(
        ['1', '10', '2', '3', '4', '5', '6', '7', '8', '9'].sort(),
      )
      expect(result.current.isPageAllSelected).toBe(true)

      // Deselect page 2 only.
      act(() => {
        result.current.onSelectPage()
      })
      expect(result.current.selectedIds.sort()).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
      ])
      expect(result.current.isPageAllSelected).toBe(false)

      // Switch back to page 1: all on page 1 still selected.
      rerender({ dataset: page1 })
      expect(result.current.isPageAllSelected).toBe(true)
    })

    test('deselectAll clears selections across pages', () => {
      const { result, rerender } = renderHook(
        ({ dataset }) => useMultiSelect<Row>(dataset),
        { initialProps: { dataset: page1 } },
      )

      act(() => {
        result.current.onSelect('2', normalClick)
      })

      rerender({ dataset: page2 })

      act(() => {
        result.current.onSelect('7', ctrlClick)
      })

      expect(result.current.selectedIds.sort()).toEqual(['2', '7'])
      act(() => {
        result.current.deselectAll()
      })
      expect(result.current.selectedIds).toEqual([])

      // Switch back to page 1: still no selections.
      rerender({ dataset: page1 })
      expect(result.current.isPageAllSelected).toBe(false)
    })
  })

  describe('dataset changes', () => {
    const initialDataset: Row[] = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
    ]

    test('anchor resets after dataset change', () => {
      const { result, rerender } = renderHook(
        ({ dataset }) => useMultiSelect(dataset),
        { initialProps: { dataset: initialDataset } },
      )

      act(() => {
        result.current.onSelect('2', normalClick)
      })
      expect(result.current.selectedIds).toEqual(['2'])

      act(() => {
        result.current.onSelect('4', shiftClick)
      })
      expect(result.current.selectedIds.sort()).toEqual(['2', '3', '4'])

      // Change dataset.
      const changedDataset: Row[] = [...initialDataset, { id: '6' }]

      act(() => {
        rerender({ dataset: changedDataset })
      })

      // Anchor resets, now acts as if no anchor existed, using top row.
      act(() => {
        result.current.onSelect('6', shiftClick)
      })
      expect(result.current.selectedIds.sort()).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ])

      // Anchor is now 6, last range end is 1.
      act(() => {
        result.current.onSelect('3', shiftClick)
      })
      expect(result.current.selectedIds.sort()).toEqual(['3', '4', '5', '6'])
    })
  })
})
