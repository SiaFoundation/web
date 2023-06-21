import { EventsViewDropdownMenu } from './EventsViewDropdownMenu'

export function WalletsFiltersBar() {
  return (
    <div className="flex gap-2 justify-end w-full">
      <EventsViewDropdownMenu />
    </div>
  )
}
