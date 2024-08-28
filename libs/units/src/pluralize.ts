type PluralizeOptions = {
  plural?: string
  zeroForm?: string
}

export function pluralize(
  count: number,
  word: string,
  pluralFormOrOptions?: string | PluralizeOptions
) {
  const pluralForm =
    typeof pluralFormOrOptions === 'string'
      ? pluralFormOrOptions
      : pluralFormOrOptions?.plural
  const zeroForm =
    typeof pluralFormOrOptions === 'string'
      ? `0 ${pluralForm}`
      : pluralFormOrOptions?.zeroForm

  if (count === 0) {
    return zeroForm
  } else if (count === 1) {
    return `1 ${word}`
  } else {
    return `${count.toLocaleString()} ${pluralForm}`
  }
}
