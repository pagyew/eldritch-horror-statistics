export function isNumberedArray(arr: any[]): arr is number[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'number')
}

export function findNumber<T>(fn: (...x: number[]) => number, arr: T[], key?: keyof T): number {
  if (arr.length == 0) {
    console.warn('Array is empty')
    return NaN
  }

  const flatArray = typeof key === 'undefined' ? arr : arr.map(elem => elem[key])
  let numberedArray: number[]

  if (isNumberedArray(flatArray)) {
    numberedArray = flatArray
  } else {
    console.warn('Array must be numbered. We made it.')
    numberedArray = flatArray.map(item => Number(item))
  }

  return fn(...numberedArray)
}

export function findMax<T>(arr: T[], key?: keyof T): number {
  return findNumber(Math.max, arr, key)
}

export function findMin<T>(arr: T[], key?: keyof T): number {
  return findNumber(Math.min, arr, key)
}

export function getNames<T extends Record<"name", any>>(arr: T[]): T["name"][] {
  return arr.map(elem => elem.name)
}

export function fromMs(ms: number) {
  const h = Math.floor(ms / 1000 / 60 / 60)
  const m = Math.floor(ms / 1000 / 60) % 60
  const s = Math.floor(ms / 1000) % 60

  return { h, m, s }
}

export function toMs(params: { h?: number, m?: number, s?: number }): number {
  const { h = 0, m = 0, s = 0 } = params

  return h * 1000 * 60 * 60 + m * 1000 * 60 + s * 1000
}

export function formatTime(ms: number): string {
  const { h, m } = fromMs(ms)

  return `${h}h ${m}m`
}

export function lower<T extends string>(str: T) {
  return str.toLowerCase() as Lowercase<T>
}

export function upper<T extends string>(str: T) {
  return str.toUpperCase() as Uppercase<T>
}

export function arr(n: number, options?: { start?: number, step?: number }) {
  const { start = 1, step = 1 } = options ?? {}
  return Array.from({ length: n }, (_, i) => start + i * step)
}

export function join(arr: any, separator: string = ', ') {
  if (!Array.isArray(arr)) {
    console.warn('Array is not an array')
    return ''
  }

  return arr.join(separator)
}

export function groupBy<T extends Record<PropertyKey, any>>(arr: T[], key: keyof T) {
  return arr.reduce((acc, elem) => {
    const keyValue = elem[key]

    if (!acc[keyValue]) {
      acc[keyValue] = []
    }

    acc[keyValue].push(elem)

    return acc
  }, {} as { [k in T[keyof T]]: T[] })
}

export function mergeBy<T extends Record<PropertyKey, any>, P extends Record<PropertyKey, any>, K extends Extract<keyof T, keyof P>>(arr1: T[], arr2: P[], key: K) {
  const grouped1 = groupBy(arr1, key)
  const grouped2 = groupBy(arr2, key)
  const keys = new Set([...Object.keys(grouped1), ...Object.keys(grouped2)]) as Set<(T & P)[K]>
  const result: (T & P)[] = []

  for (const key of keys) {
    const items1 = grouped1[key] ?? []
    const items2 = grouped2[key] ?? []
    const item = {} as T & P

    for (const item1 of items1) Object.assign(item, item1)
    for (const item2 of items2) Object.assign(item, item2)

    result.push(item)
  }

  return result
}

export function extend<T extends Record<PropertyKey, any>, K extends PropertyKey, V>(obj: T, key: K, value: V): T & Record<K, V>
export function extend<T extends Record<PropertyKey, any>, K extends PropertyKey, V>(key: K, value: V): (obj: T) => T & Record<K, V>
export function extend<T extends Record<PropertyKey, any>, K extends PropertyKey, V>(objOrKey: T | K, keyOrValue: K | V, value?: V) {
  function exec(realObj: T, realKey: K, realValue: V): T & Record<K, V> {
    return { ...realObj, [realKey]: realValue }
  }

  if (
    typeof objOrKey === 'object' && objOrKey !== null &&
    ['string', 'number', 'symbol'].includes(typeof keyOrValue) &&
    typeof value !== 'undefined'
  ) return exec(objOrKey, keyOrValue as K, value)

  return function (obj: T) {
    return exec(obj, objOrKey, keyOrValue as V)
  }
}

type SortOptions<T> = { key?: keyof T, order?: 'asc' | 'desc' }

export function sortBy<T>(arr: T[], options?: SortOptions<T>): T[]
export function sortBy<T>(options: SortOptions<T>): (arr: T[]) => T[]
export function sortBy<T>(arrOrOpts: T[] | SortOptions<T>, options?: SortOptions<T>) {
  function exec(realArr: T[], realOptions?: SortOptions<T>) {
    const { key, order = 'asc' } = realOptions ?? {}
    return realArr.toSorted((a, b) => {
      let aValue
      let bValue

      if (typeof key !== 'undefined' && ((typeof a === 'object' && a !== null) || Array.isArray(a))) {
        aValue = a[key]
        bValue = b[key]
      } else {
        aValue = a
        bValue = b
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'desc' ? bValue - aValue : aValue - bValue
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue)
      }

      return 0
    })
  }

  if (Array.isArray(arrOrOpts)) {
    return exec(arrOrOpts, options)
  }

  return function (arr: T[]) {
    return exec(arr, arrOrOpts)
  }
}

type StringKey = string & PropertyKey
type StringKeyOf<T> = string & keyof T
type UnionToIntersection<U> = (U extends unknown ? (u: U) => void : never) extends ((i: infer I) => void) ? I & U : never

export function pick<T extends Record<string, any>, K extends StringKeyOf<T> | `${StringKeyOf<T>}:${StringKey}`>(...keys: K[]) {
  return function (obj: T) {
    return keys.reduce((acc, options) => {
      const [key, alias] = options.split(':') as [keyof T, string]
      return Object.assign(acc, { [alias ?? key]: obj[key] })
    }, {} as UnionToIntersection<K extends `${infer F}:${infer S}` ? { [k in S]: T[F] } : K extends `${infer F}` ? { [k in F]: T[F] } : {}>)
  }
}

export function apply<T extends Record<PropertyKey, any>, K extends keyof T, F extends (v: T[K]) => any>(key: K, fn: F) {
  return function (obj: T) {
    obj[key] = fn(obj[key])
    return obj as { [k in keyof T]: k extends K ? ReturnType<F> : T[k] }
  }
}

export function map<T, R>(arr: T[], fn: (v: T) => R): R[]
export function map<T, R>(fn: (v: T) => R): (arr: T[]) => R[]
export function map<T, R>(arrOrFn: T[] | ((v: T) => R), fn?: (v: T) => R) {
  function exec(realArr: T[], realFn: (v: T) => R) {
    return realArr.map(realFn)
  }

  if (typeof arrOrFn === 'function') {
    return function (arr: T[]) {
      return exec(arr, arrOrFn)
    }
  }

  if (typeof fn !== 'undefined') {
    return exec(arrOrFn, fn)
  }

  return arrOrFn
}

export function pipe<T>(input: T): T
export function pipe<T, R1>(input: T, a: (i: T) => R1): R1
export function pipe<T, R1, R2>(input: T, a: (i: T) => R1, b: (i: R1) => R2): R2
export function pipe<T, R1, R2, R3>(input: T, a: (i: T) => R1, b: (i: R1) => R2, c: (i: R2) => R3): R3
export function pipe<T, R1, R2, R3, R4>(input: T, a: (i: T) => R1, b: (i: R1) => R2, c: (i: R2) => R3, d: (i: R3) => R4): R4
export function pipe<T, R1, R2, R3, R4, R5>(input: T, a: (i: T) => R1, b: (i: R1) => R2, c: (i: R2) => R3, d: (i: R3) => R4, e: (i: R4) => R5): R5
export function pipe<T>(input: T, ...fns: Function[]) {
  return fns.reduce((acc, fn) => fn(acc), input)
}
