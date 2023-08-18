import { useContractSetSettings } from '../../../hooks/useContractSetSettings'

export function useDefaultContractSetNotSet() {
  const css = useContractSetSettings()

  return {
    active: css.data && !css.data?.default,
  }
}
