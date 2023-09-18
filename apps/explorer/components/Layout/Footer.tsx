import {
  Container,
  Link,
  webLinks,
  Logo,
  ThemeRadio,
  CurrencySelector,
} from '@siafoundation/design-system'

export function Footer() {
  return (
    <Container className="pt-16">
      <div className="py-4 border-t border-gray-200 dark:border-graydark-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Logo size={20} />
            <Link
              size="12"
              color="contrast"
              weight="medium"
              underline="hover"
              href={webLinks.website.index}
              noWrap
            >
              The Sia Foundation © {new Date().getFullYear()}
            </Link>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <Link
              href={webLinks.website.tos}
              size="12"
              color="subtle"
              underline="hover"
              noWrap
            >
              Terms of Service
            </Link>
            <Link
              href={webLinks.website.privacy}
              size="12"
              color="subtle"
              underline="hover"
              noWrap
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex-1" />
          <div className="flex-1 flex items-center justify-end gap-6">
            <CurrencySelector />
            <ThemeRadio className="hidden md:flex" />
          </div>
        </div>
      </div>
    </Container>
  )
}
