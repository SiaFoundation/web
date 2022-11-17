import { Text } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

import { useCallback, useEffect, useState } from 'react'

type ImageItem = {
  title: string
  key: string
  props: {
    src: string
    height?: number
    width?: number
    blurDataURL?: string
  }
}

export function useCarousel(items: ImageItem[]) {
  const [intervalKey, setIntervalKey] = useState<number>(Math.random())

  const [currentItem, _setCurrentItem] = useState<ImageItem>(items[0])

  const setCurrentItem = useCallback(
    (item: ImageItem) => {
      _setCurrentItem(item)
      setIntervalKey(Math.random())
    },
    [_setCurrentItem, setIntervalKey]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      _setCurrentItem((currentItem) => {
        const index = items.findIndex((item) => item.key === currentItem.key)
        const nextIndex = index === items.length - 1 ? 0 : index + 1
        const nextImage = items[nextIndex]
        return nextImage
      })
    }, 4_000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalKey])

  return {
    items,
    currentItem,
    setCurrentItem,
  }
}

type CarouselTagsProps = {
  items: ImageItem[]
  setCurrentItem: (item: ImageItem) => void
  currentItem: ImageItem
}

export function CarouselTags({
  currentItem,
  setCurrentItem,
  items,
}: CarouselTagsProps) {
  return (
    <div className="flex flex-wrap gap-x-4 md:gap-x-10 gap-y-2 md:gap-y-10 items-center justify-center">
      {items.map((item) => (
        <Text
          key={item.key}
          onClick={() => setCurrentItem(item)}
          font="mono"
          weight={currentItem.key === item.key ? 'semibold' : 'regular'}
          color={currentItem.key === item.key ? 'contrast' : 'subtle'}
          className={cx(
            'cursor-pointer underline-offset-2',
            currentItem.key === item.key ? 'underline' : ''
          )}
        >
          {item.title}
        </Text>
      ))}
    </div>
  )
}
