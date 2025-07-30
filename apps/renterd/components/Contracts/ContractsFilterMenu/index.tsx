import {
  textFieldStyles,
  Label,
  Panel,
  Button,
  ScrollArea,
  ControlGroup,
} from '@siafoundation/design-system'
import { Close16 } from '@siafoundation/react-icons'
import { Command } from 'cmdk'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { Page } from '../../CmdRoot/types'
import { ContractsFilterCmd } from '../ContractsCmd/ContractsFilterCmd'

export function ContractsFilterMenu() {
  const { filters, removeFilter, removeLastFilter } = useContracts()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<Page[]>([])
  const currentPage = pages[pages.length - 1]
  const rootPage = pages.length === 0
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const pushPage = useCallback(
    (page: Page) => {
      setPages((pages) => [...pages, page])
    },
    [setPages],
  )

  const resetPage = useCallback(() => {
    setPages([])
  }, [setPages])

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const beforeSelect = useCallback(() => {
    inputRef.current?.focus()
  }, [inputRef])

  const afterSelect = useCallback(() => {
    setSearch('')
    resetPage()
  }, [resetPage])

  return (
    <div className="flex gap-1">
      {filters.map((filter) => (
        <ControlGroup key={filter.id}>
          <Button variant="active" state="waiting">
            {filter.label}
          </Button>
          <Button
            variant="active"
            size="small"
            onClick={() => removeFilter(filter.id)}
          >
            <Close16 />
          </Button>
        </ControlGroup>
      ))}
      <Command
        ref={rootRef}
        label="Command Menu"
        // onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          // Escape goes to previous page
          // Backspace goes to previous page when search is empty
          if (pages.length > 0) {
            if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
              e.preventDefault()
              setPages((pages) => pages.slice(0, -1))
            }
          } else if (pages.length === 0) {
            if (e.key === 'Backspace' && !search) {
              removeLastFilter()
            }
            if (e.key === 'Escape' && !search) {
              setOpen(false)
              inputRef.current?.blur()
            }
          }
        }}
      >
        <Command.Input
          aria-label="filter contracts"
          name="filter-contracts-menu-input"
          ref={inputRef}
          value={search}
          onValueChange={setSearch}
          className={textFieldStyles({ variant: 'ghost', focus: 'none' })}
          placeholder={rootPage ? 'Filter contracts' : `Filter contracts`}
        />
        {open && (
          <Panel className="absolute z-20 min-w-[200px] max-h-[400px] overflow-auto p-1">
            <ScrollArea>
              {currentPage && (
                <Label className="px-1.5 py-1">{currentPage.label}</Label>
              )}
              {/* {rootPage && !search && (
                  <Command.Separator className={separatorStyles('my-2')} />
                )} */}
              <Command.List>
                <ContractsFilterCmd
                  currentPage={currentPage}
                  beforeSelect={beforeSelect}
                  afterSelect={afterSelect}
                  pushPage={pushPage}
                />
              </Command.List>
            </ScrollArea>
          </Panel>
        )}
      </Command>
    </div>
  )
}
