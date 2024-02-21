export function isWinner(game: IGame): game is IGameWinning {
  return game.result.winner
}

export function calculateScore(game: IGameWinning) {
  return game.result.scoring.reduce((acc, { score }) => acc + score, 0)
}
