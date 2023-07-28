import { ContentItemProps } from '@siafoundation/design-system'
import { CalloutProject } from './CalloutProject'

type Props = {
  items?: ContentItemProps[]
}

export function SectionProjects({ items }: Props) {
  return (
    <>
      {items.map((s) => (
        <CalloutProject
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
