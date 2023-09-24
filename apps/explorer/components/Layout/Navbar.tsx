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
  network?: 'mainnet' | 'zen'
  homeHref: string
  children: React.ReactNode
}

export function Navbar({ appName, network, homeHref, children }: Props) {
  return (
    <div className={cx("py-3 z-10 bg-white dark:bg-graydark-50 border-b border-gray-200 dark:border-graydark-200",
      network === 'mainnet' ? (
        "border-t-4  border-t-green-500 dark:border-t-green-400"
      ) : '',
      network === 'zen' ? (
        "border-t-4  border-t-amber-500 dark:border-t-amber-400"
      ) : '',
    )}>
      <Container size="4" className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="relative z-10 flex">
            <Link href={homeHref} underline="none">
              <div className="flex items-center gap-1.5 mr-2">
                <Logo size={35} />
                {appName && (
                  <Heading
                    font="mono"
                    size="24"
                    className="hidden pl-0 pr-px md:block tracking-tight relative -top-px"
                  >
                    {appName}
                  </Heading>
                )}
                {network !== 'mainnet' && (
                  <Text
                    className="bg-amber-500 dark:bg-amber-400 rounded py-0 px-2 hidden sm:flex"
                    color="lo"
                  >
                    {network}
                  </Text>
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
