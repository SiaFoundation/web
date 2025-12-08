import { LayoutFullscreen } from '../../components/Layout'

export default async function RootFullScreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutFullscreen>{children}</LayoutFullscreen>
}
