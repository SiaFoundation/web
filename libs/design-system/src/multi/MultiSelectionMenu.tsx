'use client'

import { Button } from '../core/Button'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { pluralize } from '@siafoundation/units'
import { Close16 } from '@siafoundation/react-icons'
import { MultiSelect, MultiSelectItem } from './useMultiSelect'
import { AppDockedControl } from '../app/AppDockedControl'

export function MultiSelectionMenu<Item extends MultiSelectItem>({
  multiSelect,
  children,
  entityWord,
  entityWordPlural,
}: {
  multiSelect: MultiSelect<Item>
  children: React.ReactNode
  entityWord: string
  entityWordPlural?: string
}) {
  const isVisible = multiSelect.selectionCount > 0

  if (!isVisible) {
    return <AppDockedControl />
  }

  return (
    <AppDockedControl>
      <Panel
        aria-label={entityWord + ' multiselect menu'}
        className="pl-3 pr-2 py-2 min-w-[250px] flex gap-2 items-center rounded-lg light:bg-black pointer-events-auto"
      >
        {!!multiSelect.selectionCount && (
          <Text size="14">
            {`${pluralize(multiSelect.selectionCount, entityWord, {
              plural: entityWordPlural,
            })} selected${
              multiSelect.someSelectedItemsOutsideCurrentPage &&
              multiSelect.someSelectedOnCurrentPage
                ? ' on this and other pages'
                : !multiSelect.someSelectedItemsOutsideCurrentPage &&
                  multiSelect.someSelectedOnCurrentPage
                ? ''
                : multiSelect.someSelectedItemsOutsideCurrentPage &&
                  !multiSelect.someSelectedOnCurrentPage
                ? ' on other pages'
                : ''
            }`}
          </Text>
        )}
        <div className="flex-1" />
        {children}
        <Button
          tip="Deselect all"
          onClick={multiSelect.deselectAll}
          size="small"
        >
          <Close16 />
        </Button>
      </Panel>
    </AppDockedControl>
  )
}
