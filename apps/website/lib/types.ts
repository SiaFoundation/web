export type AsyncReturnType<
  T extends (...args: unknown[]) => Promise<unknown>
> = T extends (...args: unknown[]) => Promise<infer R> ? R : never

export type ContentItem = {
  title: string
  subtitle?: string
  link: string
  description?: string
  date?: number
  tags: string[]
}
