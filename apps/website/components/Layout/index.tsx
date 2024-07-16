import { Container } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import type React from 'react'
import { useScrollTop } from '../../hooks/useScrollTop'
import { PageHead } from '../PageHead'
import { Background } from './Background'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type Props = {
  title: string
  description: string
  date?: string
  path: string
  navbar?: React.ReactNode
  heading: React.ReactNode
  children: React.ReactNode
  previewImage: string
  backgroundImage: string
}

export function Layout({
  title,
  description,
  date,
  path,
  heading,
  children,
  previewImage,
  backgroundImage,
}: Props) {
  const { scrollTop } = useScrollTop()
  const scrolledDown = scrollTop > 0

  return (
    <div className="relative h-full w-full overflow-hidden">
      <PageHead
        title={title}
        description={description}
        image={previewImage}
        date={date}
        path={path}
      />
      <div id="main-scroll" className="relative z-10 h-full overflow-y-auto">
        <Container
          size="4"
          pad={false}
          className={cx(
            'relative p-0 z-10',
            'border-y-0',
            'border-x-2',
            'border-gray-400 dark:border-graydark-600',
            // 'rounded-lg',
          )}
        >
          <Navbar scrolledDown={scrolledDown} />
          <main className="flex flex-col gap-14 w-full">
            <div className="flex flex-col">
              <div>{heading}</div>
              <div className="flex flex-col">{children}</div>
              <Footer />
            </div>
          </main>
        </Container>
      </div>
      <Background background={backgroundImage} />
    </div>
  )
}
