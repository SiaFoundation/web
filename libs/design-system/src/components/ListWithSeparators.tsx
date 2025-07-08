import React, { Fragment } from 'react'

type Props = {
  separator: React.ReactNode
  children: React.ReactNode
}

export function ListWithSeparators({ separator, children }: Props) {
  const filteredChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (typeof child.type === 'function'
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (child.type as any)(child.props) !== null
        : true)
  ) as React.ReactElement<{ id?: string; name?: string }>[]
  return (
    <>
      {filteredChildren.map((child, index) => (
        <Fragment key={child?.props?.id || child?.props?.name}>
          {child}
          {index < React.Children.count(filteredChildren) - 1 && separator}
        </Fragment>
      ))}
    </>
  )
}
