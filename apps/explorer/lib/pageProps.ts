export type ExplorerPageProps<
  T extends Record<string, string | number | object> = { id: string }
> = {
  params: T
}
