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
