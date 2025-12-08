import { Layout } from '../../components/Layout'

export default async function RootMainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
