import { triggerErrorToast } from '@siafoundation/design-system'
import { useEffect } from 'react'
import { loadWASM } from '../lib/wasm'

export function useWasm() {
  useEffect(() => {
    const func = async () => {
      const { error } = await loadWASM()
      if (error) {
        triggerErrorToast(
          'Error initializing WASM. This browser is not supported.',
          {
            duration: 60_000,
          }
        )
      }
    }
    func()
  }, [])
}
