export const useContentStore = defineStore('content', () => {
  const ancients = ref<IAncient[]>([])

  // TODO: EHS-1
  // @ts-ignore
  const a: ParsedContent | null = null

  function setAncients(newAncients: IAncientPC | null) {
    return ancients.value = newAncients?.body ?? []
  }

  async function getAllAncients() {
    return queryContent<IAncientPC>('ancients').findOne().then(setAncients)
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
  }

  return {
    ancients,
    getAllAncients
  }
})
