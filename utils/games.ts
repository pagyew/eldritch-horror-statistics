export function isWinner<T extends IGame>(game: T): game is T & IGameWin {
  return game.results.isWin
}

export function isScored<T extends IGame>(game: T): game is T & IGameWinFilled {
  return typeof game.results.scores !== 'undefined'
}

export function calculateScore(game: IGameWinFilled): number
export function calculateScore(scores: IScores): number
export function calculateScore(gameOrScores: IGameWinFilled | IScores) {
  const scores = 'results' in gameOrScores ? gameOrScores.results.scores : gameOrScores
  const { gates, monsters, cursed, rumors, clues, blessed, doom } = scores

  return (
    gates
    + Math.ceil(monsters / 3)
    + cursed
    + rumors * 3
    - Math.ceil(clues / 3)
    - blessed
    - doom
  )
}
