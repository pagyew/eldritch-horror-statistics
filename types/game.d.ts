declare interface IGameGeneral {
  date: string
  ancientName: AncientName
  playerCount: number
}

declare interface IGameNew extends IGameGeneral {
  id: string
  isWin: boolean
}

declare interface IGame extends IGameNew {
  expansionNames?: ExpansionName[]
  investigatorNames?: InvestigatorName[]
  rules?: IGameRules
  results?: IGameWinResults | IGameLoseResults
}

declare interface IGameWin extends IGame {
  isWin: true
  results: IGameWinResults
}

declare interface IGameLose extends IGame {
  isWin: false
  results: IGameLoseResults
}

declare interface IGameRules {
  preludeName?: PreludeName
  hasStartingRumor?: boolean
  mythos?: IGameMythos[]
}

declare type IGameMythos = 'easy' | 'normal' | 'hard'

declare interface IGameResults {
  solvedMysteryCount: number
  time: number
  comment: string
  scores?: IScores
  reason?: ReasonName
}

declare interface IGameWinResults extends IGameResults {
  scores: IScores
}

declare interface IGameLoseResults extends IGameResults {
  reason: ReasonName
}
