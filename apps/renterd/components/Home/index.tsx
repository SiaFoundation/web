import { routes } from '../../config/routes'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace(routes.buckets.index)
  }, [router])

  return <div />
}
