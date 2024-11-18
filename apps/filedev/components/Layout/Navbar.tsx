import {
  Container,
  Heading,
  Link,
  Logo,
  Text,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = {
  appName?: string
  homeHref: string
  children: React.ReactNode
}

export function Navbar({ appName, homeHref, children }: Props) {
  return (
    <div
      className={cx(
        'py-3 z-10 bg-white dark:bg-graydark-50 border-b border-gray-200 dark:border-graydark-200',
        'border-t-4  border-t-green-500 dark:border-t-green-400'
      )}
    >
      <Container size="4" className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="relative z-10 flex">
            <Link href={homeHref} underline="none">
              <div
                className="flex items-center gap-1.5 mr-2"
                data-testid="filedev-identity"
              >
                {/* <Logo size={35} /> */}
                {appName && (
                  <Heading
                    font="mono"
                    size="24"
                    className="hidden pl-0 pr-px md:block tracking-tight relative -top-px"
                    data-testid="filedev-identity-appName"
                  >
                    {/* {appName} */}
                  </Heading>
                )}
              </div>
            </Link>
          </div>
          {children}
        </div>
      </Container>
    </div>
  )
}
