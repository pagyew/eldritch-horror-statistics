declare interface IGame {
  id: string
  date: string
  ancient: AncientName
  players: number
  expansions: ExpansionName[]
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
  prelude?: PreludeName
  startingRumor: boolean
  mythos: IGameMythos[]
}

declare type IGameMythos = 'easy' | 'normal' | 'hard'

declare interface IGameResult {
  winner: boolean
  solvedMysteries: number
  time: number
  comment?: string
  scoring?: IScores
  reason?: ReasonName
}

declare interface IGameWinningResult extends IGameResult {
  winner: true
  scoring: IScores
}

declare interface IGameLosingResult extends IGameResult {
  winner: false
  reason: ReasonName
}
