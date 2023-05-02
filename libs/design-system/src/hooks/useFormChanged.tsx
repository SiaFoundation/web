import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

type Value = string | BigNumber | number | boolean | Record<string, unknown>

type Formik = {
  initialValues: Record<string, Value>
  values: Record<string, Value>
}

export function useFormChanged(form: Formik, skip: string[] = []) {
  type Changed = Record<keyof typeof form['initialValues'], boolean>
  const changed = useMemo(() => {
    const keys = Object.keys(form.initialValues).filter(
      (k) => !skip.includes(k)
    )
    return keys.reduce((acc, key) => {
      const iv = form.initialValues[key]
      const v = form.values[key]
      let changed = iv !== v
      if (iv instanceof BigNumber && v instanceof BigNumber) {
        changed = !iv.eq(v)
      } else if (typeof iv === 'object' && typeof v === 'object') {
        changed = JSON.stringify(iv) !== JSON.stringify(v)
      }
      return {
        ...acc,
        [key]: changed,
      }
    }, {}) as Changed
  }, [form.values, form.initialValues, skip])

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
