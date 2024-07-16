import useLocalStorageState from 'use-local-storage-state'

export function useTermsOfService() {
  const [accepted, setAccepted] = useLocalStorageState(
    'v0/website/terms/accepted',
    {
      defaultValue: false,
    },
  )
  return {
    accepted,
    setAccepted,
  }
}
