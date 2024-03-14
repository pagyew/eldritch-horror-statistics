export function isWinner<T extends IGame>(game: T): game is T & IGameWin {
  return game.isWin
}

export function isResulted<T extends IGame>(game: T): game is T & IGameResulted {
  return typeof game.results !== 'undefined'
}

export function calculateScore(game: IGameWin & IGameResulted) {
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
