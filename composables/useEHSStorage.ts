type StorageOptions<T> = Parameters<typeof useLocalStorage<T>>[2]

export default function <T>(key: string, initialValue: T, options?: StorageOptions<T>) {
  return useLocalStorage<T>(`ehs-storage-${key}`, initialValue, options)
}
