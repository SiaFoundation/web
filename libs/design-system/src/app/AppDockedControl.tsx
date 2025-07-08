'use client'

import { AnimatePresence, motion } from 'motion/react'

export function AppDockedControl({ children }: { children?: React.ReactNode }) {
  return (
    <AnimatePresence>
      {children && (
        <motion.div
          className="pointer-events-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
