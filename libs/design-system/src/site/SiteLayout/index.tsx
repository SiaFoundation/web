import { ScrollArea } from '../../core/ScrollArea'
import { ImageProps } from '../../lib/image'
import { MenuSection, SiteMenu } from './SiteMenu'
import { Container } from '../../core/Container'
import React, { useEffect, useState } from 'react'
import { cx } from 'class-variance-authority'

type Props = {
  navbar?: React.ReactNode
  menuSections: MenuSection[]
  heading: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: React.ReactNode
  transitions?: boolean
  transitionWidthDuration?: number
  transitionFadeDelay?: number
}

export function SiteLayout({
  menuSections,
  navbar,
  heading,
  children,
  footer,
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
    <div
      className={cx(
        'relative h-screen overflow-hidden',
        focus ? 'border border-black dark:border-graydark-1100' : ''
      )}
      style={{ borderWidth: focus ? '3px' : '0' }}
    >
      {focus && (
        <div className="fixed z-20 top-8 right-8">
          <SiteMenu menuSections={menuSections} />
        </div>
      )}
      <div className="relative z-10 h-full">
        <ScrollArea id="main-scroll">
          <div
            className={focus ? 'm-0' : 'my-0 mx-0 xl:mx-12'}
            style={{
              transition: 'margin 100ms ease-in',
            }}
          >
            <Container
              size="4"
              pad={false}
              className={cx(
                'relative overflow-hidden p-0',
                focus ? 'sm:border-r-black' : 'border-black',
                focus
                  ? 'sm:dark:border-r-graydark-1100 '
                  : 'dark:border-graydark-1100',
                focus ? 'sm:border-r-3' : 'border-3',
                focus ? 'ml-0 max-w-full' : 'mx-auto max-w-screen-2xl',
                focus ? 'w-full sm:w-[600px]' : '',
                transitioning ? 'bg-white dark:bg-graydark-50' : ''
              )}
              style={{
                transition: `width ${transitionWidthDuration}ms ease-out`,
              }}
            >
              <Container
                size="4"
                className="bg-white dark:bg-graydark-50 pt-10"
              >
                <div className="flex justify-between items-start">
                  {navbar}
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
                    <div className="relative w-full h-96 overflow-hidden border-t border-b border-black dark:border-graydark-1100 xl:hidden">
                      <div className="absolute w-full h-full mix-blend-darken z-10 bg-mask" />
                      <div
                        className="relative w-full h-96"
                        style={{
                          background: `url(${backgroundImage.src})`,
                          backgroundSize: 'cover',
                        }}
                      />
                    </div>
                    <div>{children}</div>
                    {footer}
                  </div>
                )}
              </main>
            </Container>
          </div>
        </ScrollArea>
      </div>
      <div
        className="hidden sm:block absolute right-0 top-0 z-0 h-full overflow-hidden bg-white"
        style={{
          width: focus ? 'calc(100% - 600px)' : '100%',
          left: focus ? '600px' : 0,
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full mix-blend-darken z-10 bg-mask" />
          <div
            className="z-0 relative w-ful h-full"
            style={{
              background: `url(${backgroundImage.src})`,
              backgroundSize: 'cover',
              // opacity: 0.7,
            }}
          />
        </div>
      </div>
    </div>
  )
}
