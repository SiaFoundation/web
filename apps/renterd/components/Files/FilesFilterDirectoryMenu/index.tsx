import { Button, Separator, TextField } from '@siafoundation/design-system'
import { useEffect, useState } from 'react'
import { useFiles } from '../../../contexts/files'
import { useDebounce } from 'use-debounce'
import { Close16 } from '@siafoundation/react-icons'

export function FilesFilterDirectoryMenu() {
  const { filters, setFilter, removeFilter } = useFiles()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)

  useEffect(() => {
    const fileNamePrefixFilter = filters.find((f) => f.id === 'fileNamePrefix')
    const fileNamePrefix = fileNamePrefixFilter?.value || ''
    if (fileNamePrefix !== search) {
      setSearch(fileNamePrefix)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearch, filters])

  useEffect(() => {
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
        variant="ghost"
        focus="none"
        placeholder="Filter files in current directory"
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
