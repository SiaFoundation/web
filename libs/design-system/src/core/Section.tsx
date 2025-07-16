import { Container } from './Container'

export function Section({
  children,
  background,
  size,
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  size?: React.ComponentProps<typeof Container>['size']
  background?: React.ReactNode
} & {
  ref?: React.Ref<HTMLElement>
}) {
  return (
    <section {...props} ref={ref} className={className}>
      {background}
      <Container size={size} className="relative z-10">
        <div className="flex flex-col">{children}</div>
      </Container>
    </section>
  )
}
