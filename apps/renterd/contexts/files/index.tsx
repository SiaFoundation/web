import {
  Text,
  ValueNum,
  TableColumn,
  LoadingDots,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { useObject, useObjectDirectory } from '@siafoundation/react-core'
import { useUploads } from '../uploads'
import { createContext, useContext, useMemo } from 'react'
import { sortBy, toPairs } from 'lodash'
import { ObjectDropdownMenu } from '../../components/Files/ObjectDropdownMenu'
import { useHasFetched } from '../../hooks/useHasFetched'
import { useEmptyStates } from '../../hooks/useEmptyStates'

type ColumnIds = 'name' | 'size' | 'slabs' | 'actions'

type Data = {
  id: string
  path: string
  isUploading?: boolean
}

function useFilesMain() {
  const { onDrop, uploadsList } = useUploads()
  const response = useObjectDirectory({
    params: {
      key: encodeURIComponent('/'),
    },
  })

  const datasetFiltered: Data[] = useMemo(() => {
    const dataMap: Record<string, Data> = {}

    response.data?.entries?.forEach((o) => {
      dataMap[o] = {
        id: o,
        path: o,
      }
    })
    uploadsList.forEach(({ path }) => {
      dataMap[path] = {
        id: path,
        path: `//${path}`,
        isUploading: true,
      }
    })
    const all = sortBy(
      toPairs(dataMap).map((p) => p[1]),
      'path'
    )
    return all
  }, [response, uploadsList])

  const datasetPage = useMemo(() => datasetFiltered, [datasetFiltered])

  const columns: TableColumn<ColumnIds, Data>[] = [
    {
      id: 'name',
      label: 'Name',
      size: 5,
      render: ({ path }) => (
        <Text ellipsis weight="semibold">
          {path}
        </Text>
      ),
    },
    {
      id: 'size',
      label: 'Size',
      size: 2,
      render: function SizeColumn({ path }: Data) {
        const obj = useObject({
          params: {
            key: encodeURIComponent(path.slice(1)),
          },
          config: {
            swr: {
              dedupingInterval: 5000,
            },
          },
        })
        if (obj.error) {
          return <LoadingDots />
        }
        return (
          <ValueNum
            size="12"
            value={(obj.data?.object.Slabs || []).reduce(
              (acc, s) => acc.plus(s.Length - s.Offset),
              new BigNumber(0)
            )}
            variant="value"
            color="subtle"
            format={(v) => humanBytes(v.toNumber())}
          />
        )
      },
    },
    {
      id: 'slabs',
      label: 'Slabs',
      size: 2,
      render: function SlabsColumn({ path }: Data) {
        const obj = useObject({
          params: {
            key: encodeURIComponent(path.slice(1)),
          },
          config: {
            swr: {
              dedupingInterval: 5000,
            },
          },
        })
        if (obj.error) {
          return <LoadingDots />
        }
        return (
          <ValueNum
            size="12"
            value={new BigNumber(obj.data?.object.Slabs.length || 0)}
            variant="value"
            format={(v) => humanNumber(v)}
          />
        )
      },
    },
    {
      id: 'actions',
      label: '',
      size: 0.5,
      className: 'justify-end',
      render: ({ path, isUploading }) =>
        !isUploading && <ObjectDropdownMenu path={path} />,
    },
  ]

  const { isLoading, hasFetched } = useHasFetched(response)
  const { emptyNoneYet, emptyNoneMatchingFilters } = useEmptyStates(
    hasFetched,
    datasetPage,
    []
  )
  return {
    isLoading,
    hasFetched,
    emptyNoneYet,
    emptyNoneMatchingFilters,
    // limit,
    // offset,
    pageCount: datasetPage.length,
    datasetCount: datasetFiltered.length,
    columns,
    datasetPage,
    onDrop,
    uploadsList,
    // configurableColumns,
    // enabledColumns,
    // toggleColumnVisibility,
    // toggleSort,
    // setSortDirection,
    // setSortColumn,
    // sortColumn,
    // filters,
    // setFilter,
    // removeFilter,
    // removeLastFilter,
    // sortDirection,
    // sortOptions,
    // resetDefaultColumnVisibility,
  }
}

type State = ReturnType<typeof useFilesMain>

const FilesContext = createContext({} as State)
export const useFiles = () => useContext(FilesContext)

type Props = {
  children: React.ReactNode
}

export function FilesProvider({ children }: Props) {
  const state = useFilesMain()
  return <FilesContext.Provider value={state}>{children}</FilesContext.Provider>
}
