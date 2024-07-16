export function configCategoryPattern<Cat extends string>(
  config: { label: string; color: string },
  category: Cat,
  pattern?: boolean,
) {
  return {
    ...config,
    category,
    pattern,
  }
}

export function configCategoryLabel<Cat extends string>(
  config: { label?: string; color?: string },
  category: Cat,
  label?: string,
) {
  return {
    ...config,
    category,
    label,
  }
}
