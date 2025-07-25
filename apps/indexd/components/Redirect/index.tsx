'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function Redirect({ route }: { route: string }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(route)
  }, [router, route])

  return <div />
}
