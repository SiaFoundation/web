import { userPrefersReducedMotion } from '@siafoundation/design-system'
import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { getGPUTier } from 'detect-gpu'

export function useGlobeSettings() {
  const reduceMotion = userPrefersReducedMotion()
  const [{ canRender, isEnabled }, setSettings] = useLocalStorageState(
    'v0/globe',
    {
      defaultValue: {
        canRender: true,
        isEnabled: !reduceMotion,
      },
    }
  )

  const setIsEnabled = useCallback(
    (isEnabled: boolean) => {
      setSettings((settings) => ({
        ...settings,
        isEnabled,
      }))
    },
    [setSettings]
  )

  const setCanRender = useCallback(
    (canRender: boolean) => {
      setSettings((settings) => ({
        ...settings,
        canRender,
      }))
    },
    [setSettings]
  )

  const checkGpu = useCallback(async () => {
    const gpuTier = await getGPUTier()
    const canRender = gpuTier.fps >= 15
    setCanRender(canRender)
    console.log('GPU', gpuTier)
  }, [setCanRender])

  useEffect(() => {
    checkGpu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shouldRender = canRender && isEnabled

  return {
    canRender,
    isEnabled,
    setCanRender,
    setIsEnabled,
    shouldRender,
  }
}
