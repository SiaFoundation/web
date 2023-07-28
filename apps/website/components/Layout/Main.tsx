import React from 'react'
import { MenuSection } from './SiteMenu'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { cx } from 'class-variance-authority'

type Props = {
  menuSections: MenuSection[]
  heading: React.ReactNode
  children: React.ReactNode
  focus?: React.ReactNode
  transitioning?: boolean
}

export function Main({ heading, children, focus, transitioning }: Props) {
  return (
    <>
      {!focus && <Navbar />}
      <main
        className={cx(
          'flex flex-col gap-14 w-full',
          focus ? 'bg-mask' : '',
          transitioning ? 'opacity-0' : 'opacity-100'
        )}
      >
        {focus}
        {!focus && (
          <div className="flex flex-col">
            <div>{heading}</div>
            <div
              className={cx(
                'relative w-full h-96 overflow-hidden xl:hidden',
                'rounded',
                'border',
                'border-gray-400 dark:border-graydark-400'
              )}
            />
            <div className="flex flex-col">{children}</div>
            <Footer />
          </div>
        )}
      </main>
    </>
  )
}
