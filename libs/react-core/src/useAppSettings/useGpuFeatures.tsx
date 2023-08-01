import { useCallback, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { getGPUTier } from 'detect-gpu'
import { usePrefersReducedMotion } from '../userPrefersReducedMotion'

export function useGpuFeatures() {
  const reduceMotion = usePrefersReducedMotion()
  const [hasCheckedGpu, setHasCheckedGpu] = useState<boolean>(false)
  const [canGpuRender, setCanGpuRender] = useState<boolean>(false)
  const [{ isGpuEnabled }, setSettings] = useLocalStorageState(
    'v0/gpuFeatures',
    {
      defaultValue: {
        isGpuEnabled: !reduceMotion,
      },
    }
  )

  const setIsGpuEnabled = useCallback(
    (isGpuEnabled: boolean) => {
      setSettings((settings) => ({
        ...settings,
        isGpuEnabled,
      }))
    },
    [setSettings]
  )

  const checkGpu = useCallback(async () => {
    let canRender = false
    // library prints lots of console.error for unimplemented libraries
    // skip check during tests
    if (process.env['NODE_ENV'] !== 'test') {
      const gpu = await getGPUTier()
      console.log('GPU', gpu)
      // canRender = gpu.gpu?.startsWith('apple') || (gpu.fps || 0) >= 15
      canRender = gpu.tier > 0
    }
    setCanGpuRender(canRender)
    setHasCheckedGpu(true)
  }, [setCanGpuRender])

  useEffect(() => {
    checkGpu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shouldRender = canGpuRender && isGpuEnabled

  return {
    hasCheckedGpu,
    canGpuRender,
    isGpuEnabled,
    setCanGpuRender,
    setIsGpuEnabled,
    shouldRender,
  }
}
