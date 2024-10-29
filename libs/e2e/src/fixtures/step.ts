import test from 'playwright/test'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function step<T, Args extends any[]>(
  name: string,
  fn: (...args: Args) => Promise<T>,
  { box = true } = {}
): (...args: Args) => Promise<T> {
  return (...args: Args) => test.step(name, () => fn(...args), { box })
}
