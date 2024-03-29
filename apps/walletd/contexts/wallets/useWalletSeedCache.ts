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
  const [mnemonicCache, _setMnemonicCache] = useState<Record<string, string>>(
    {}
  )
  const cachedMnemonicCount = useMemo(
    () => Object.keys(mnemonicCache).length,
    [mnemonicCache]
  )

  const updateWalletActivityAt = useCallback(
    (walletId: string) => {
      setWalletActivityAt((walletActivityAt) => ({
        ...walletActivityAt,
        [walletId]: new Date().getTime(),
      }))
    },
    [setWalletActivityAt]
  )

  const cacheWalletMnemonic = useCallback(
    (walletId: string, mnemonic: string | undefined) => {
      _setMnemonicCache((mnemonics) => ({
        ...mnemonics,
        [walletId]: mnemonic,
      }))
      if (mnemonic) {
        updateWalletActivityAt(walletId)
      }
    },
    [_setMnemonicCache, updateWalletActivityAt]
  )

  const evictStale = useCallback(() => {
    if (!walletAutoLockEnabled) {
      return
    }
    const now = new Date().getTime()
    const ago = now - walletAutoLockTimeout
    for (const [walletId, mnemonic] of Object.entries(mnemonicCache)) {
      if (mnemonic) {
        const timestamp = walletActivityAt[walletId] || 0
        if (timestamp < ago) {
          cacheWalletMnemonic(walletId, undefined)
        }
      }
    }
  }, [
    mnemonicCache,
    walletActivityAt,
    cacheWalletMnemonic,
    walletAutoLockTimeout,
    walletAutoLockEnabled,
  ])

  const lockAllWallets = useCallback(() => {
    _setMnemonicCache({})
  }, [_setMnemonicCache])

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
    mnemonicCache,
    cacheWalletMnemonic,
    lockAllWallets,
    cachedMnemonicCount,
    walletAutoLockTimeout,
    setWalletAutoLockTimeout,
    setWalletAutoLockEnabled,
    walletAutoLockEnabled,
  }
}
