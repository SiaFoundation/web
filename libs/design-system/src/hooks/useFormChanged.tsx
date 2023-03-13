import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

type Formik = {
  initialValues: Record<string, string | BigNumber>
  values: Record<string, string | BigNumber>
}

export function useFormChanged(form: Formik) {
  type Changed = Record<keyof typeof form['initialValues'], boolean>
  const changed = useMemo(() => {
    const keys = Object.keys(form.initialValues)
    return keys.reduce((acc, key) => {
      const iv = form.initialValues[key]
      const v = form.values[key]
      return {
        ...acc,
        [key]: iv instanceof BigNumber ? !iv.isEqualTo(v) : iv !== v,
      }
    }, {}) as Changed
  }, [form.values, form.initialValues])

  const changeCount = useMemo(() => {
    let count = 0
    for (const change of Object.entries(changed)) {
      if (change[1]) {
        count++
      }
    }
    return count
  }, [changed])

  return {
    changed,
    changeCount,
  }
}
