declare interface IGame {
  id: string
  date: string
  ancient: string
  players: number
  expansions: string[]
  investigators: string[]
  rules: IGameRules
  result: IGameWinningResult | IGameLosingResult
}

declare interface IGameWinning extends IGame {
  result: IGameWinningResult
}

declare interface IGameLosing extends IGame {
  result: IGameLosingResult
}

declare interface IGameRules {
  prelude?: string | boolean
  startingRumors?: string | boolean
  mythos: IGameMythos
}

declare interface IGameMythos {
  easy: boolean
  normal: boolean
  hard: boolean
}

declare interface IGameResult {
  winner: boolean
  solvedMysteries: number
  time: number
  comment?: string
  scoring?: IScore[]
  reason?: string
}

declare interface IGameScore {
  title: string
  score: number
}

declare interface IGameWinningResult extends IGameResult {
  winner: true
  scoring: IScore[]
}

declare interface IGameLosingResult extends IGameResult {
  winner: false
  reason: string
}
