import { Layout } from '../../components/Layout'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
