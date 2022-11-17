import React from 'react'
import { ImageProps, Container } from '@siafoundation/design-system'
import { MenuSection, SiteMenu } from './SiteMenu'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

type Props = {
  menuSections: MenuSection[]
  heading: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: React.ReactNode
  transitioning?: boolean
}

export function Main({
  heading,
  children,
  focus,
  backgroundImage,
  menuSections,
  transitioning,
}: Props) {
  return (
    <>
      <Container size="4" className="bg-white dark:bg-graydark-50 pt-10">
        <div className="flex justify-between items-center">
          <Navbar />
          {!focus && <SiteMenu menuSections={menuSections} />}
        </div>
      </Container>
      <main
        className="flex flex-col gap-14 w-full"
        style={{
          opacity: transitioning ? 0 : 1,
        }}
      >
        {focus}
        {!focus && (
          <div className="flex flex-col">
            <div>{heading}</div>
            <div className="relative w-full h-96 overflow-hidden border-t-3 border-b-3 border-black dark:border-graydark-1100 xl:hidden">
              <div className="absolute w-full h-full mix-blend-darken z-10 bg-mask" />
              <div
                className="relative w-full h-96"
                style={{
                  background: `url(${backgroundImage.src})`,
                  backgroundSize: 'cover',
                }}
              />
            </div>
            <div className="flex flex-col">{children}</div>
            <Footer />
          </div>
        )}
      </main>
    </>
  )
}
