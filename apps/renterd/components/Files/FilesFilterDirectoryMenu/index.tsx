import { Button, Separator, TextField } from '@siafoundation/design-system'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Close16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../../contexts/filesManager'

type Props = {
  placeholder?: string
}

export function FilesFilterDirectoryMenu({ placeholder }: Props) {
  const { setFilter, removeFilter, fileNamePrefixFilter } = useFilesManager()
  const [search, setSearch] = useState(fileNamePrefixFilter)
  const [debouncedSearch] = useDebounce(search, 500)

  // Update search value directly when fileNamePrefixFilter changes
  useEffect(() => {
    if (fileNamePrefixFilter !== search) {
      setSearch(fileNamePrefixFilter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileNamePrefixFilter])

  // Update and trigger the server filter if the debounced search value changes
  useEffect(() => {
    if (fileNamePrefixFilter === debouncedSearch) {
      return
    }
    if (debouncedSearch.length) {
      setFilter({
        id: 'fileNamePrefix',
        label: '',
        value: debouncedSearch,
      })
    } else {
      removeFilter('fileNamePrefix')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div className="flex gap-1 flex-1">
      <TextField
        aria-label="filter files in current directory"
        variant="ghost"
        focus="none"
        placeholder={placeholder || 'Filter files in current directory'}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        className="w-full !pl-0"
      />
      {!!search.length && (
        <>
          <Button variant="ghost" onClick={() => setSearch('')}>
            <Close16 />
          </Button>
          <Separator variant="vertical" className="h-full" />
        </>
      )}
    </div>
  )
}
