import React from 'react'
import { MenuSection } from './SiteMenu'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

type Props = {
  menuSections: MenuSection[]
  heading: React.ReactNode
  children: React.ReactNode
}

export function Main({ heading, children }: Props) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-14 w-full">
        <div className="flex flex-col">
          <div>{heading}</div>
          <div className="flex flex-col">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  )
}
