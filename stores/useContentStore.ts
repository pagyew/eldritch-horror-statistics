export const useContentStore = defineStore('content', () => {
  const ancients = ref<IAncient[]>([])
  const preludes = ref<IPrelude[]>([])
  const scoreTitles = ref<IScores>({})
  const reasonsForDefeat = ref<IReason[]>([])

  // TODO: EHS-1
  // @ts-ignore
  const a: ParsedContent | null = null

  async function getResultContent() {
    return Promise.all([
      queryContent<IAncientPC>('ancients').findOne(),
      queryContent<IPreludePC>('preludes').findOne(),
      queryContent<IScoresPC>('scores').findOne(),
      queryContent<IReasonPC>('reasons').findOne()
    ]).then(([ancientsCtx, preludesCtx, scoresCtx, reasonsCtx]) => {
      ancients.value = ancientsCtx.ancients
      preludes.value = preludesCtx.preludes
      scoreTitles.value = scoresCtx.scores
      reasonsForDefeat.value = reasonsCtx.reasons
      return { ancientsCtx, preludesCtx, scoresCtx, reasonsCtx }
    })
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
  }

  return {
    ancients,
    preludes,
    scoreTitles,
    reasonsForDefeat,
    getResultContent
  }
})
