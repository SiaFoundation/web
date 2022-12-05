import { Launch16 } from '../icons/carbon'
import { Text } from '../core/Text'
import { useIsExternalDomain } from '../hooks/useIsExternalDomain'

type Props = {
  link: string
}

export function WebDomain({ link }: Props) {
  const isExternal = useIsExternalDomain(link)
  const url = new URL(link)

  return (
    <div className="flex gap-0 items-center">
      <Text size="12" color="subtle" font="sans">
        {url.host}
      </Text>
      {isExternal && (
        <Text color="subtle" className="scale-75 top-px relative">
          <Launch16 />
        </Text>
      )}
    </div>
  )
}
