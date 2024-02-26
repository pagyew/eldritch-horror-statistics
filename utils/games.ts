export function isWinner(game: IGame): game is IGameWinning {
  return game.result.winner
}

export function calculateScore(game: IGameWinning) {
  return Object.values(game.result.scoring).reduce((a, b) => a + b)
}
