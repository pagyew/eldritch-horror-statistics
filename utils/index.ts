export function isNumberedArray(arr: any[]): arr is number[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'number')
}

export function findNumber<T>(fn: (...x: number[]) => number, arr: T[], key?: keyof T): number {
  if (arr.length == 0)
    throw new Error('Array is empty')

  const flatArray = typeof key === 'undefined' ? arr : arr.map(elem => elem[key])

  if (!isNumberedArray(flatArray))
    throw new Error('Array must be numbered')

  return fn(...flatArray)
}

export function findMax<T>(arr: T[], key?: keyof T): number {
  return findNumber(Math.max, arr, key)
}

export function findMin<T>(arr: T[], key?: keyof T): number {
  return findNumber(Math.max, arr, key)
}

export function getNames<T extends Record<"name", any>>(arr: T[]): T["name"][] {
  return arr.map(elem => elem.name)
}
