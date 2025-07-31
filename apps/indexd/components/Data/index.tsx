import { type DataView } from './Views'
import { HostsTab } from './Hosts/HostsTab'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { ContractsTab } from './Contracts/ContractsTab'
import { AccountsTab } from './Accounts/AccountsTab'

export function DataExplorer() {
  const params = useSearchParams()
  const view = params.get('view') as DataView
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (!view) {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set('view', 'hosts')
      router.replace(`${pathname}?${paramsObj.toString()}`)
    }
  }, [view, params, pathname, router])

  if (!view) return null
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {view === 'hosts' && <HostsTab />}
      {view === 'contracts' && <ContractsTab />}
      {view === 'accounts' && <AccountsTab />}
    </div>
  )
}
