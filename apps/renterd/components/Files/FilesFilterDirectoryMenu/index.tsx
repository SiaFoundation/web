import { Button, Separator, TextField } from '@siafoundation/design-system'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Close16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../../contexts/filesManager'

type Props = {
  placeholder?: string
}

export function FilesFilterDirectoryMenu({ placeholder }: Props) {
  const { filters, setFilter, removeFilter } = useFilesManager()
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
