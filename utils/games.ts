export function isWinner<T extends IGame>(game: T): game is T & IGameWin {
  return game.results.isWin
}

export function isScored<T extends IGame>(game: T): game is T & IGameWinFilled {
  return typeof game.results.scores !== 'undefined'
}

export function calculateScore(game: IGameWinFilled) {
  const { gates, monsters, cursed, rumors, clues, blessed, doom } = game.results.scores
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
