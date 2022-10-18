import { Text, Flex } from '@siafoundation/design-system'

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
    <Flex
      gapX={{
        '@initial': 2,
        '@bp2': 5,
      }}
      gapY={{
        '@initial': 1,
        '@bp2': 5,
      }}
      justify="center"
      wrap="wrap"
    >
      {items.map((item) => (
        <Text
          key={item.key}
          onClick={() => setCurrentItem(item)}
          font="mono"
          weight={currentItem.key === item.key ? 'semibold' : 'regular'}
          color={currentItem.key === item.key ? 'contrast' : 'subtle'}
          css={{
            cursor: 'pointer',
            textUnderlineOffset: '2px',
            textDecoration: currentItem.key === item.key ? 'underline' : 'none',
          }}
        >
          {item.title}
        </Text>
      ))}
    </Flex>
  )
}
