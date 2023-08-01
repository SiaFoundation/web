import { Container } from '@siafoundation/design-system'
import React from 'react'
import { cx } from 'class-variance-authority'
import { Background } from './Background'
import { Main } from './Main'
import { PageHead } from '../PageHead'
import { menuSections } from '../../config/siteMap'

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
            'border-gray-400 dark:border-graydark-600',
            'border-3',
            'mx-auto max-w-screen-2xl'
          )}
        >
          <Main heading={heading} menuSections={menuSections}>
            {children}
          </Main>
        </Container>
      </div>
      <Background background={backgroundImage} />
    </div>
  )
}
