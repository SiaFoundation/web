import {
  Text,
  Heading,
  PatternedPanel,
  Checkbox,
  Link,
  Badge,
} from '@siafoundation/design-system'
import { useTermsOfService } from '../hooks/useTermsOfService'
import { routes } from '../config/routes'

type Props = {
  background: string
  title: string
  status?: string
  description: string
  downloadSelect: React.ReactNode
}

export function DownloadCard({
  background,
  title,
  status,
  description,
  downloadSelect,
}: Props) {
  const { accepted, setAccepted } = useTermsOfService()

  return (
    <PatternedPanel background={background}>
      <div className="flex flex-col p-3">
        <div className="flex justify-between gap-2">
          <Heading size="20" className="pb-1">
            {title}
          </Heading>
          {status && (
            <div className="relative top-0.5">
              <Badge variant="amber">{status}</Badge>
            </div>
          )}
        </div>
        <Text className="pb-3" color="subtle">
          {description}
        </Text>
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-1 gap-1">
            <Checkbox
              aria-label="Acept the Terms of Service"
              onCheckedChange={(checked) => setAccepted(!!checked)}
              checked={accepted}
            />
            <Text
              size="14"
              className="flex items-center gap-1"
              ellipsis
              onClick={() => setAccepted(!accepted)}
            >
              I accept the{' '}
              <Link
                href={routes.terms.index}
                target="_blank"
                size="14"
                ellipsis
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                Terms of Service
              </Link>
            </Text>
          </div>
          {downloadSelect}
        </div>
      </div>
    </PatternedPanel>
  )
}
