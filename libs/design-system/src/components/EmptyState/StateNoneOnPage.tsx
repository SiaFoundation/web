'use client'

import { Button } from '../../core/Button'
import { Text } from '../../core/Text'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Reset32 } from '@siafoundation/react-icons'
import { useCallback } from 'react'

export function StateNoneOnPage({ message }: { message?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const back = useCallback(() => {
    const query = new URLSearchParams(searchParams.toString())
    query.set('offset', '0')
    query.set('marker', '')
    router.push(`${pathname}?${query.toString()}`)
  }, [router, pathname, searchParams])
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <Reset32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        {message ?? 'No data on this page, reset pagination to continue.'}
      </Text>
      <Button onClick={back}>Back to first page</Button>
    </div>
  )
}
