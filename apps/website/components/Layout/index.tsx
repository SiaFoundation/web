import { ImageProps, Container } from '@siafoundation/design-system'
import { SiteMenu } from './SiteMenu'
import React, { useEffect, useState } from 'react'
import { cx } from 'class-variance-authority'
import { BackgroundImage } from './BackgroundImage'
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
  previewImage: ImageProps
  backgroundImage: ImageProps
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
        className={cx(
          'relative z-10 h-full overflow-y-auto',
          focus ? 'p-0' : 'py-0 px-0 xl:px-12',
          focus ? 'border border-black dark:border-graydark-1100' : ''
        )}
        style={{
          transition: 'margin 100ms ease-in',
          borderWidth: focus ? '3px' : '0',
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
            focus
              ? 'sm:border-r-black sm:dark:border-r-graydark-1100'
              : 'border-black dark:border-graydark-1100',
            focus ? 'sm:border-r-3' : 'border-3',
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
        {/* </div> */}
        {/* </ScrollArea> */}
      </div>
      <BackgroundImage focus={!!focus} backgroundImage={backgroundImage} />
    </div>
  )
}
