import { CalloutRenterd } from './CalloutRenterd'
import { CalloutHostd } from './CalloutHostd'

type Props = {
  versionRenterd?: string
  versionHostd?: string
}

export function SoftwareSectionNextGen({
  versionRenterd,
  versionHostd,
}: Props) {
  return (
    <>
      <CalloutRenterd version={versionRenterd} />
      <CalloutHostd version={versionHostd} />
    </>
  )
}
