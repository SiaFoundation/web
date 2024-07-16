import type { ContentItemProps } from '@siafoundation/design-system'
import { CalloutTutorial } from './CalloutTutorial'

type Props = {
  items?: ContentItemProps[]
}

export function SectionTutorials({ items }: Props) {
  return (
    <>
      {items.map((s) => (
        <CalloutTutorial
          key={s.title + s.link}
          title={s.title}
          subtitle={s.subtitle}
          link={s.link}
          idea={s.idea}
          image={s.image}
          background={s.background}
        />
      ))}
    </>
  )
}
