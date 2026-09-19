'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cx } from 'class-variance-authority'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  keyToResetScrollbars?: string
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollArea({
  id,
  className,
  style,
  children,
  keyToResetScrollbars,
  ref,
}: Props) {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null)
  const viewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      setViewport(node)
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )
  useRemeasureOnScrollSizeChange(viewport)

  return (
    <ScrollAreaPrimitive.Root
      className={cx('w-full h-full overflow-hidden', className)}
      style={style}
    >
      <ScrollAreaPrimitive.Viewport
        id={id}
        ref={viewportRef}
        // Part 1: Temporary fix until removed upstream:
        // https://github.com/radix-ui/primitives/issues/926
        // Part 2: After updating radix there was an issues where the scroll area
        // would adopt its contents width. The following fixed that:
        // https://github.com/radix-ui/primitives/issues/3129
        className="w-full h-full [&>div]:!min-w-0 [&>div]:!block [&>div]:!h-full"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        key={keyToResetScrollbars ? `v-${keyToResetScrollbars}` : undefined}
        orientation="vertical"
        className="z-10 flex select-none touch-none transition-colors hover:bg-black/20 w-1.5"
      >
        <ScrollAreaPrimitive.Thumb
          className={cx(
            'flex-1 relative bg-gray-300 rounded',
            'before:content[""] before:absolute before:top-1/2 before:left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full',
          )}
        />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        key={keyToResetScrollbars ? `h-${keyToResetScrollbars}` : undefined}
        orientation="horizontal"
        className="z-10 flex flex-col select-none touch-none transition-colors duration-1000 hover:bg-black/20 h-1"
      >
        <ScrollAreaPrimitive.Thumb
          className={cx(
            'flex-1 relative bg-gray-300 rounded',
            'before:content[""] before:absolute before:top-1/2 before:left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full',
          )}
        />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="bg-black/70" />
    </ScrollAreaPrimitive.Root>
  )
}

// Radix sizes and positions the thumbs from measurements it refreshes only when
// its content element or a scrollbar resizes. The viewport classes above lock
// the content element to the viewport's height so children can use h-full,
// which means it never resizes when its children grow, and the thumbs keep the
// measurements from the first render until the window is resized.
// Watch the viewport's scroll size and, when it changes, alter the content
// element's content box by a fraction of a pixel so radix's own ResizeObserver
// fires and re-measures. Remounting the scrollbars instead would hide them
// under the pointer, because their hover-visible state resets on mount.
function useRemeasureOnScrollSizeChange(viewport: HTMLDivElement | null) {
  useEffect(() => {
    const content = viewport?.firstElementChild
    if (
      !viewport ||
      !(content instanceof HTMLElement) ||
      typeof ResizeObserver === 'undefined'
    ) {
      return
    }

    let lastWidth = viewport.scrollWidth
    let lastHeight = viewport.scrollHeight
    let frame = 0
    let nudged = false

    const check = () => {
      frame = 0
      const width = viewport.scrollWidth
      const height = viewport.scrollHeight
      if (width === lastWidth && height === lastHeight) {
        return
      }
      lastWidth = width
      lastHeight = height
      nudged = !nudged
      // Browsers track layout in 1/64px or 1/60px units, so the change has to
      // be larger than that for the ResizeObserver to see it.
      content.style.paddingBottom = nudged ? '0.05px' : '0px'
    }
    const scheduleCheck = () => {
      if (!frame) {
        frame = requestAnimationFrame(check)
      }
    }

    const resizeObserver = new ResizeObserver(scheduleCheck)
    const observeChildren = () => {
      resizeObserver.disconnect()
      for (const child of Array.from(content.children)) {
        resizeObserver.observe(child)
      }
    }
    observeChildren()

    // Children that are themselves h-full do not resize when their descendants
    // overflow them, so also check on DOM changes and whenever the user scrolls.
    const mutationObserver = new MutationObserver(() => {
      observeChildren()
      scheduleCheck()
    })
    mutationObserver.observe(content, { childList: true, subtree: true })
    viewport.addEventListener('scroll', scheduleCheck, { passive: true })

    return () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      viewport.removeEventListener('scroll', scheduleCheck)
    }
  }, [viewport])
}
