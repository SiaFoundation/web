import { Container } from '@siafoundation/design-system'
import { SiteMenu } from './SiteMenu'
import React, { useEffect, useState } from 'react'
import { cx } from 'class-variance-authority'
import { Background } from './Background'
import { Main } from './Main'
import { PageHead } from '../PageHead'
import { menuSections } from '../../config/siteMap'
import { StaticImageData } from 'next/image'

type Props = {
  title: string
  description: string
  date?: string
  path: string
  navbar?: React.ReactNode
  heading: React.ReactNode
  children: React.ReactNode
  previewImage: StaticImageData
  backgroundImage: StaticImageData
  focus?: React.ReactNode
  transitions?: boolean
  transitionWidthDuration?: number
  transitionFadeDelay?: number
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
  focus: _focus,
  transitions: _transitions = false,
  transitionWidthDuration = 300,
  transitionFadeDelay = 500,
}: Props) {
  // If transitions are on, enable after first client render
  const [transitions, setTransitions] = useState<boolean>(false)
  useEffect(() => {
    if (_transitions) {
      setTransitions(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [transitioning, setTransitioning] = useState<boolean>(false)
  useEffect(() => {
    if (!transitions) {
      return
    }
    setTransitioning(true)
    setTimeout(() => {
      setTransitioning(false)
    }, transitionFadeDelay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_focus])

  const [focus, setFocus] = useState<React.ReactNode>(_focus)

  useEffect(() => {
    if (!_focus) {
      setFocus(_focus)
    } else {
      setTimeout(() => {
        setFocus(_focus)
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_focus])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <PageHead
        title={title}
        description={description}
        image={previewImage.src}
        date={date}
        path={path}
      />
      <div
        id="main-scroll"
        className={cx('relative z-10 h-full overflow-y-auto')}
        style={{
          transition: 'margin 100ms ease-in',
        }}
      >
        {/* show floating menu */}
        {focus && (
          <div className="fixed z-20 right-8 top-9">
            <SiteMenu menuSections={menuSections} />
          </div>
        )}
        <Container
          size="4"
          pad={false}
          className={cx(
            'relative p-0 z-10',
            // 'rounded-xl',
            focus ? '' : 'border-gray-400 dark:border-graydark-600',
            focus ? '' : 'border-3',
            focus ? 'ml-0 max-w-full' : 'mx-auto max-w-screen-2xl',
            focus ? 'sm:w-[600px]' : '',
            transitioning ? 'bg-white dark:bg-graydark-50' : ''
          )}
          style={{
            transition: `width ${transitionWidthDuration}ms ease-out`,
          }}
        >
          <Main
            focus={focus}
            heading={heading}
            backgroundImage={backgroundImage}
            transitioning={transitioning}
            menuSections={menuSections}
          >
            {children}
          </Main>
        </Container>
      </div>
      <Background focus={!!focus} background={backgroundImage} />
    </div>
  )
}
