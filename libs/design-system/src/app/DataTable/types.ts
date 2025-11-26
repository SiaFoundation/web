import { type ColumnDef, type Column } from '@tanstack/react-table'

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
