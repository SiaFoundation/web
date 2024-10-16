'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../core/Button'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { pluralize } from '@siafoundation/units'
import { Close16 } from '@siafoundation/react-icons'

export function MultiSelectionMenu({
  isVisible,
  selectionCount,
  isPageAllSelected,
  deselectAll,
  pageCount,
  children,
  entityWord,
  entityWordPlural,
}: {
  isVisible: boolean
  selectionCount: number
  isPageAllSelected: boolean | 'indeterminate'
  pageCount: number
  children: React.ReactNode
  deselectAll: () => void
  entityWord: string
  entityWordPlural?: string
}) {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center p-4 dark">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Panel
              aria-label={entityWord + ' multiselect menu'}
              className="pl-3 pr-2 py-2 min-w-[250px] flex gap-2 items-center rounded-lg light:bg-black"
            >
              {!!selectionCount && (
                <Text size="14">
                  {pluralize(selectionCount, entityWord, {
                    plural: entityWordPlural,
                  })}{' '}
                  selected
                </Text>
              )}
              {isPageAllSelected && selectionCount > pageCount && (
                <Text>across multiple pages</Text>
              )}
              <div className="flex-1" />
              {children}
              <Button tip="Deselect all" onClick={deselectAll} size="small">
                <Close16 />
              </Button>
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
