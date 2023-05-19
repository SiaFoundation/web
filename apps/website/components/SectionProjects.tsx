import { Software } from '../content/projects'
import { CalloutProject } from './CalloutProject'

type Props = {
  items?: Software[]
}

export function SectionProjects({ items }: Props) {
  return (
    <>
      {items.map((s) => (
        <CalloutProject
          key={s.link}
          title={s.title}
          variant="subtle"
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
