import { minutesInMilliseconds } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import useLocalStorageState from 'use-local-storage-state'

export function useWalletSeedCache() {
  const [walletAutoLockEnabled, setWalletAutoLockEnabled] =
    useLocalStorageState<boolean>('v0/wallets/walletAutoLockEnabled', {
      defaultValue: true,
    })
  const [walletAutoLockTimeout, setWalletAutoLockTimeout] =
    useLocalStorageState<number>('v0/wallets/walletAutoLockTimeout', {
      defaultValue: minutesInMilliseconds(5),
    })
  const [walletActivityAt, setWalletActivityAt] = useState<
    Record<string, number>
  >({})
  const [seedCache, _setSeedCache] = useState<Record<string, string>>({})
  const seedCount = useMemo(() => Object.keys(seedCache).length, [seedCache])

  const updateWalletActivityAt = useCallback(
    (walletId: string) => {
      setWalletActivityAt((walletActivityAt) => ({
        ...walletActivityAt,
        [walletId]: new Date().getTime(),
      }))
    },
    [setWalletActivityAt]
  )

  const saveWalletSeed = useCallback(
    (walletId: string, seed: string | undefined) => {
      _setSeedCache((seeds) => ({
        ...seeds,
        [walletId]: seed,
      }))
      if (seed) {
        updateWalletActivityAt(walletId)
      }
    },
    [_setSeedCache, updateWalletActivityAt]
  )

  const evictStale = useCallback(() => {
    if (!walletAutoLockEnabled) {
      return
    }
    const now = new Date().getTime()
    const ago = now - walletAutoLockTimeout
    for (const [walletId, seed] of Object.entries(seedCache)) {
      if (seed) {
        const timestamp = walletActivityAt[walletId] || 0
        if (timestamp < ago) {
          saveWalletSeed(walletId, undefined)
        }
      }
    }
  }, [
    seedCache,
    walletActivityAt,
    saveWalletSeed,
    walletAutoLockTimeout,
    walletAutoLockEnabled,
  ])

  const lockAllWallets = useCallback(() => {
    _setSeedCache({})
  }, [_setSeedCache])

  const router = useRouter()
  const onAction = useCallback(() => {
    // user is active with a specific wallet
    if (router.pathname.startsWith(routes.wallet.base)) {
      const walletId = router.query.id as string
      updateWalletActivityAt(walletId)
    }
  }, [router, updateWalletActivityAt])

  useIdleTimer({
    onAction,
    throttle: 5_000,
    eventsThrottle: 5_000,
  })

  useEffect(() => {
    if (!walletAutoLockEnabled) {
      return
    }

    const interval = setInterval(() => {
      evictStale()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAutoLockEnabled])

  return {
    walletActivityAt,
    updateWalletActivityAt,
    seedCache,
    saveWalletSeed,
    lockAllWallets,
    seedCount,
    walletAutoLockTimeout,
    setWalletAutoLockTimeout,
    setWalletAutoLockEnabled,
    walletAutoLockEnabled,
  }
}
