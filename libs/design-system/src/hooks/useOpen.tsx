'use client'

import { useState, useMemo, useCallback } from 'react'

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function useOpen({
  open: controlOpen,
  onOpenChange: controlOnOpenChange,
}: Props) {
  const [localOpen, localSetOpen] = useState<boolean>(false)

  const open = useMemo(() => {
    if (controlOnOpenChange) {
      return controlOpen
    } else {
      return localOpen
    }
  }, [controlOnOpenChange, localOpen, controlOpen])

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (controlOnOpenChange) {
        controlOnOpenChange(open)
      } else {
        localSetOpen(open)
      }
    },
    [controlOnOpenChange]
  )

  return {
    open,
    onOpenChange,
  }
}
