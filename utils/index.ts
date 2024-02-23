export const isNumberedArray = (arr: any[]): arr is number[] =>
  Array.isArray(arr) && arr.every(item => typeof item === 'number')

export const findNumber = <T>(fn: (...x: number[]) => number, arr: T[], key?: keyof T): number => {
  if (arr.length == 0)
    throw new Error('Array is empty')

  const flatArray = typeof key === 'undefined' ? arr : arr.map(elem => elem[key])

  if (!isNumberedArray(flatArray))
    throw new Error('Array must be numbered')

  return fn(...flatArray)
}

export const findMax = <T>(arr: T[], key?: keyof T): number =>
  findNumber(Math.max, arr, key)

export const findMin = <T>(arr: T[], key?: keyof T): number =>
  findNumber(Math.max, arr, key)
