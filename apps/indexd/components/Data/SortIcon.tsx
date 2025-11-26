import {
  ChevronSort16,
  ChevronSortDown16,
  ChevronSortUp16,
} from '@siafoundation/react-icons'

interface SortIconProps {
  direction?: 'asc' | 'desc' | false
}

export function SortIcon({ direction }: SortIconProps) {
  if (direction === 'asc') {
    return (
      <div className="relative w-4 h-4">
        <ChevronSortUp16 className="absolute inset-0" />
        <ChevronSortDown16 className="absolute inset-0 opacity-30" />
      </div>
    )
  }
  if (direction === 'desc') {
    return (
      <div className="relative w-4 h-4">
        <ChevronSortUp16 className="absolute inset-0 opacity-30" />
        <ChevronSortDown16 className="absolute inset-0" />
      </div>
    )
  }
  return <ChevronSort16 />
}
