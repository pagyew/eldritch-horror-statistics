export function isWinner<T extends IGame>(game: T): game is T & IGameWin {
  return game.isWin
}

export function isResulted<T extends IGame>(game: T): game is T & IGameResulted {
  return typeof game.results !== 'undefined'
}

export function calculateScore(game: IGameWin & IGameResulted) {
  return Object.values(game.results.scores).reduce((a, b) => a + b, 0)
}
