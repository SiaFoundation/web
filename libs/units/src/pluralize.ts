type PluralizeOptions = {
  plural?: string
  customZero?: string
}

export function pluralize(
  count: number,
  word: string,
  pluralFormOrOptions?: string | PluralizeOptions
) {
  const oneForm = `1 ${word}`
  let plural = `${word}s`
  let customZero = ''

  if (typeof pluralFormOrOptions === 'string') {
    plural = pluralFormOrOptions
  }

  if (typeof pluralFormOrOptions === 'object') {
    if (pluralFormOrOptions.plural) {
      plural = pluralFormOrOptions.plural
    }
    if (pluralFormOrOptions.customZero) {
      customZero = pluralFormOrOptions.customZero
    }
  }

  const pluralForm = `${count.toLocaleString()} ${plural}`

  if (count === 0) {
    return customZero || pluralForm
  } else if (count === 1) {
    return oneForm
  } else {
    return pluralForm
  }
}
