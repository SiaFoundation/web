import { Container } from './Container'
import { Heading } from './Heading'
import { Link } from './Link'
import { Logo } from './Logo'

type Props = {
  appName?: string
  homeHref: string
  children: React.ReactNode
}

export function NavbarSite({ appName, homeHref, children }: Props) {
  return (
    <div className="py-3 z-10 bg-white dark:bg-graydark-50 border-b border-gray-200 dark:border-graydark-200">
      <Container size="4" className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="relative z-10 hidden sm:flex">
            <Link href={homeHref} underline="none">
              <div className="flex items-center gap-1.5 mr-2">
                <Logo size={40} />
                {appName && (
                  <Heading
                    font="mono"
                    size="20"
                    className="hidden pl-0 md:block"
                  >
                    {appName}
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
