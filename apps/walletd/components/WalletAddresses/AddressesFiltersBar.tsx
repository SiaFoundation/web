import { AddressesViewDropdownMenu } from './AddressesViewDropdownMenu'

export function WalletsFiltersBar() {
  return (
    <div className="flex gap-2 justify-end w-full">
      <AddressesViewDropdownMenu />
    </div>
  )
}
