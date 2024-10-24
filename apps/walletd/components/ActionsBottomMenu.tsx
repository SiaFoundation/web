import React from 'react'

export function ActionsBottomMenu({
  children,
}: {
  children?: React.ReactNode
}) {
  return <div className="flex flex-col gap-2">{children}</div>
}
