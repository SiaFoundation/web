import { Button } from '../../core/Button'
import { Text } from '../../core/Text'
import { usePagesRouter } from '@siafoundation/next'
import { Reset32 } from '@siafoundation/react-icons'
import { useCallback } from 'react'

export function StateNoneOnPage() {
  const router = usePagesRouter()
  const back = useCallback(() => {
    router.push({
      query: {
        ...router.query,
        offset: 0,
        marker: undefined,
      },
    })
  }, [router])
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <Reset32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        No data on this page, reset pagination to continue.
      </Text>
      <Button onClick={back}>Back to first page</Button>
    </div>
  )
}
