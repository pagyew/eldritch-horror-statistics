declare interface IGameGeneral {
  date: string
  ancientName: AncientName
  playerCount: number
}

declare interface IGameNew extends IGameGeneral {
  id: string
  results: IGameResults
}

declare interface IGame extends IGameNew {
  expansionNames?: ExpansionName[]
  investigators?: IGameInvestigator[]
  rules?: IGameRules
}

declare interface IGameInvestigator {
  name: InvestigatorName
  team: InvestigatorTeam
  isOut: boolean
}

declare interface IGameWin extends IGame {
  results: IGameWinResults
}

declare interface IGameLose extends IGame {
  results: IGameLoseResults
}

declare interface IGameRules {
  preludeName: PreludeName
  hasStartingRumor: boolean
  mythos: IGameMythos[]
}

declare type IGameMythos = 'easy' | 'normal' | 'hard'

declare interface IGameResults {
  isWin: boolean
  solvedMysteryCount?: number
  time?: number
  comment?: string
  scores?: IScores
  reason?: ReasonName
}

declare interface IGameWinResults extends IGameResults {
  isWin: true
  scores: IScores
}

declare interface IGameLoseResults extends IGameResults {
  isWin: false
  reason: ReasonName
}
