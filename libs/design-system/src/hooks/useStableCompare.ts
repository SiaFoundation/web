/* eslint-disable react-hooks/refs */
'use client'

import { useRef } from 'react'

// useStableBy is a stable version of useMemo that compares the previous
// and current values using a custom equals function.
export function useStableBy<T>(value: T, equals: (a: T, b: T) => boolean): T {
  const ref = useRef<T>(value)
  if (!equals(ref.current, value)) {
    ref.current = value
  }
  return ref.current
}

// useStableArrayBy is a stable version of useMemo that compares the previous
// and current values using a custom equals function.
export function useStableArrayBy<T>(
  arr: T[] | undefined,
  equals: (a: T, b: T) => boolean = (a, b) => a === b,
  key?: (item: T, index: number) => string | number,
): T[] | undefined {
  const ref = useRef<T[] | undefined>(arr)
  const prev = ref.current
  let same = true

  if (!prev || !arr || prev.length !== arr.length) {
    same = false
  } else if (key) {
    for (let i = 0; i < arr.length; i++) {
      if (key(prev[i], i) !== key(arr[i], i) || !equals(prev[i], arr[i])) {
        same = false
        break
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (!equals(prev[i], arr[i])) {
        same = false
        break
      }
    }
  }

  if (!same) ref.current = arr
  return ref.current
}

// useStableObjectBy is a stable version of useMemo that compares the previous
// and current values using a custom equals function.
export function useStableObjectBy<V extends Record<string, unknown>>(
  obj: V,
  equals: (a: V[keyof V], b: V[keyof V]) => boolean = (a, b) => Object.is(a, b),
): V {
  const ref = useRef<V>(obj)
  const prev = ref.current
  let same = true

  if (!prev || !obj) {
    same = prev === obj
  } else {
    const prevKeys = Object.keys(prev) as Array<keyof V>
    const objKeys = Object.keys(obj) as Array<keyof V>
    if (prevKeys.length !== objKeys.length) {
      same = false
    } else {
      for (let i = 0; i < objKeys.length; i++) {
        const k = objKeys[i]
        if (!(k in prev) || !equals(prev[k], obj[k])) {
          same = false
          break
        }
      }
    }
  }

  if (!same) ref.current = obj as V
  return ref.current
}

export function useLatestRef<T>(value: T) {
  const ref = useRef(value)
  if (ref.current !== value) ref.current = value
  return ref
}
