export const useGamesStore = defineStore('games', () => {
  const game = ref<IGame | null>(null)
  const games = useLocalStorage<IGame[]>('games', [])
  const scores = computed(() => games.value.filter(isWinner).map(calculateScore))
  const gamesCount = computed(() => games.value.length)
  const worstScore = computed(() => findMax(scores.value))
  const bestScore = computed(() => findMin(scores.value))

  function setCurrent(newGame: IGame | null) {
    return game.value = newGame
  }

  function setAll(newGames: IGame[]) {
    return games.value = newGames
  }

  async function getAll() {
    return games.value
    // return $fetch('/api/games').then(setGames)
  }

  async function getById(id: string) {
    const game = games.value.find(g => g.id === id)

    if (!game) {
      throw Error(`Game with id '${id}' not found`)
    }

    return setCurrent(game)
    // return $fetch<IGame>(`/api/games/${id}`).then(setGame)
  }

  async function create(game: IGame) {
    const newGames = [...games.value, game]

    return setAll(newGames)
    // return $fetch('/api/games/new', { method: 'POST', body }).then(setGame)
  }

  function $reset() {
    setCurrent(null)
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGamesStore, import.meta.hot))
  }

  return {
    game,
    games: skipHydrate(games),
    gamesCount,
    worstScore,
    bestScore,
    getById,
    getAll,
    create,
    $reset
  }
})
