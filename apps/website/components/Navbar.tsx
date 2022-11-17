import { Heading, Link, Wordmark } from '@siafoundation/design-system'

export function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Heading size="32">
          <Wordmark />
        </Heading>
      </Link>
    </div>
  )
}
