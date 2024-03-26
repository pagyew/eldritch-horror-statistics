export const useGamesStore = defineStore('games', () => {
  const game = ref<Nullable<IGame>>(null)
  const games = useEHSStorage<IGame[]>('games', [])
  const scores = computed(() => games.value.filter(isScored).map(calculateScore))
  const gamesCount = computed(() => games.value.length)
  const worstScore = computed(() => findMax(scores.value))
  const bestScore = computed(() => findMin(scores.value))

  function setCurrent(newGame: Nullable<IGame>) {
    return game.value = newGame
  }

  function setAll(newGames: IGame[]) {
    return games.value = newGames
  }

  async function getAll() {
    return games.value
  }

  async function getById(id: string) {
    const game = games.value.find(g => g.id === id)

    if (!game) {
      throw Error(`Game with id '${id}' not found`)
    }

    return setCurrent(game)
  }

  async function create(newGame: IGameNew) {
    const newGames = [...games.value, newGame]

    setAll(newGames)
    return newGame
  }

  async function update(updatedGame: IGame) {
    updateAll(updatedGame)
    return setCurrent(updatedGame)
  }

  async function updateAll(updatedGame: IGame) {
    const newGames = games.value.map(game => game.id === updatedGame.id ? updatedGame : game)

    return setAll(newGames)
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
    update,
    $reset
  }
})
