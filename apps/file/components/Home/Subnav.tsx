'use client'

import { Link } from '@siafoundation/design-system'
import { usePeers } from '../../contexts/peers'
import React from 'react'
import { usePathname } from 'next/navigation'

export function Subnav() {
  const { pageCount } = usePeers()
  const pathname = usePathname()
  return (
    <div className="flex gap-2 py-4">
      <Link
        underline="hover"
        color={pathname === '/' ? 'contrast' : 'subtle'}
        size="16"
        weight="medium"
        href="/"
      >
        Files
      </Link>
      <Link
        underline="hover"
        color={pathname === '/peers' ? 'contrast' : 'subtle'}
        size="16"
        weight="medium"
        href="/peers"
      >
        Peers ({pageCount})
      </Link>
    </div>
  )
}
