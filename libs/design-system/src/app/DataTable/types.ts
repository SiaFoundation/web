import {
  type ColumnDef,
  type Column,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'
import { useDataTable } from './useDataTable'

/**
 * Extends the ColumnDef type to include a typed sortKey property. This is used to
 * specify the server-side sort key for the column which is what is added to the search params.
 */
export type DataTableColumnDef<
  TData,
  TSortKey extends string = string,
> = ColumnDef<TData> & {
  sortKey?: TSortKey
}

/**
 * Extends the Column type to include a typed columnDef property. This is used to
 * specify the columnDef for the column which is used to render the column header and cell.
 */
export type DataTableColumn<TData, TSortKey extends string = string> = Column<
  TData,
  unknown
> & {
  columnDef: DataTableColumnDef<TData, TSortKey>
}

/**
 * Extends the SortingState type to include a generic typed id property.
 */
export type DataTableSortColumn<T extends string> = {
  id: T
  desc: boolean
}

/**
 * Extends the useDataTable type to include a typed filters and sorts properties. This is used to
 * specify the filters and sorts for the table which is used to filter and sort the data.
 */
export type DataTableState<
  T extends { id: string },
  TFilters extends ColumnFiltersState = ColumnFiltersState,
  TSorts extends SortingState = SortingState,
> = ReturnType<typeof useDataTable<T, TFilters, TSorts>>
