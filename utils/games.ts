export function isWinner(game: IGame): game is IGameWin {
  return game.isWin
}

export function calculateScore(game: IGameWin) {
  return Object.values(game.results.scores).reduce((a, b) => a + b, 0)
}
