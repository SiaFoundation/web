import { Launch16 } from '../icons/carbon'
import { Text } from '../core/Text'
import { useIsExternalDomain } from '../hooks/useIsExternalDomain'

type Props = {
  link: string
}

export function WebDomain({ link }: Props) {
  const isExternal = useIsExternalDomain(link)
  const url = new URL(link)

  let text = url.host
  if (url.hostname === 'github.com') {
    const parts = url.pathname.split('/')
    if (parts.length >= 2) {
      text = `${url.host}/${url.pathname.split('/')[1]}`
    }
  }

  return (
    <div className="flex gap-0 items-center">
      <Text size="12" color="subtle" font="sans">
        {text}
      </Text>
      {isExternal && (
        <Text color="subtle" className="scale-75 top-px relative">
          <Launch16 />
        </Text>
      )}
    </div>
  )
}
