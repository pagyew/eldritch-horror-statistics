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

export function arr(n: number, { start = 0, step = 1 }) {
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

export function extend<T extends Record<PropertyKey, any>, K extends PropertyKey, V>(obj: T, key: K, value: V): T & Record<K, V> {
  return { ...obj, [key]: value }
}
