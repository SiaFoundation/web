import { LayoutFullscreen } from '../../components/Layout'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutFullscreen>{children}</LayoutFullscreen>
}
