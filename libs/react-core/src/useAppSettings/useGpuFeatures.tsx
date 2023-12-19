import { useCallback, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import * as detectGpu from 'detect-gpu'
import { usePrefersReducedMotion } from '../userPrefersReducedMotion'
// esm compat
const { getGPUTier } = detectGpu

export function useGpuFeatures() {
  const reduceMotion = usePrefersReducedMotion()
  const [hasCheckedGpu, setHasCheckedGpu] = useState<boolean>(false)
  const [canGpuRender, setCanGpuRender] = useState<boolean>(false)
  const [{ isGpuEnabled, hasUserSet }, setSettings] = useLocalStorageState(
    'v1/gpuFeatures',
    {
      defaultValue: {
        isGpuEnabled: !reduceMotion,
        hasUserSet: false,
      },
    }
  )

  const setIsGpuEnabled = useCallback(
    (isGpuEnabled: boolean, byUser = true) => {
      setSettings((settings) => ({
        ...settings,
        isGpuEnabled,
        hasUserSet: byUser,
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
      // if user has not made a selection yet, and gpu is not powerful, disable gpu
      if (!hasUserSet && gpu.tier < 2) {
        setIsGpuEnabled(false, false)
      }
    }
    setCanGpuRender(canRender)
    setHasCheckedGpu(true)
  }, [setCanGpuRender, setIsGpuEnabled, hasUserSet])

  useEffect(() => {
    checkGpu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shouldRender = canGpuRender && isGpuEnabled

  return {
    // has the GPU been evaluated
    hasCheckedGpu,
    // does the GPU have the ability to render at all
    canGpuRender,
    // is the GPU currently enabled by default or the user
    isGpuEnabled,
    // if the GPU has the ability and is currently enabled
    shouldRender,

    setCanGpuRender,
    setIsGpuEnabled,
  }
}
