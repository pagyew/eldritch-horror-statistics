export const useGamesStore = defineStore('games', () => {
  const game = ref<IGame | null>(null)
  const games = ref<IGame[]>([])
  const scores = computed(() => games.value.filter(isWinner).map(calculateScore))
  const gamesCount = computed(() => games.value.length)
  const worstScore = computed(() => findMax(scores.value))
  const bestScore = computed(() => findMin(scores.value))

  function setGame(newGame: IGame | null) {
    return game.value = newGame
  }

  function setGames(newGames: IGame[]) {
    return games.value = newGames
  }

  async function getAllGames() {
    return $fetch('/api/games').then(setGames)
  }

  async function getGame(id: number) {
    return $fetch(`/api/games/${id}`).then(setGame)
  }

  async function createGame(body: IGame) {
    return $fetch('/api/games/new', { method: 'POST', body }).then(setGame)
  }

  function $reset() {
    setGame(null)
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGamesStore, import.meta.hot))
  }

  return {
    game,
    games,
    gamesCount,
    worstScore,
    bestScore,
    getAllGames,
    getGame,
    createGame,
    $reset
  }
})
