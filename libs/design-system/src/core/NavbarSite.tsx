import { Container } from './Container'
import { Heading } from './Heading'
import { Link } from './Link'
import { Separator } from './Separator'
import { Logo } from './Logo'

type Props = {
  appName?: string
  homeHref: string
  children: React.ReactNode
}

export function NavbarSite({ appName, homeHref, children }: Props) {
  return (
    <div className="py-3 z-10 bg-white dark:bg-graydark-50 border border-gray-500 dark:border-graydark-500">
      <Container size="4" className="relative">
        <div className="flex items-center justify-between gap-6">
          <div className="relative z-10 hidden sm:flex">
            <Link href={homeHref} underline={false}>
              <div className="flex items-center gap-4">
                <Logo size={40} />
                {appName && (
                  <>
                    <div className="h-[30px] hidden md:block">
                      <Separator orientation="vertical" className="h-full" />
                    </div>
                    <Heading
                      font="mono"
                      size="20"
                      className="hidden pl-0 md:block"
                    >
                      {appName}
                    </Heading>
                  </>
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
