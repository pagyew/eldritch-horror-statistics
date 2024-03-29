declare type IGameMythos = 'easy' | 'normal' | 'hard'
declare type IGameBlock = keyof IGameBlocks

declare interface IGameBlocks {
  general: IGameGeneral
  comment: string
  expansionNames: ExpansionName[]
  rules: IGameRules
  investigators: IGameInvestigator[]
  results: IGameResults
}

declare interface IGameGeneral {
  date: string
  ancientName: AncientName
  playerCount: number
}

declare interface IGameResults {
  isWin: boolean
  solvedMysteryCount?: number
  time?: number
  scores?: IScores
  reason?: ReasonName
}

declare interface IGameNew {
  id: string
  general: IGameGeneral
  results: IGameResults
  comment?: string
}

declare interface IGameRules {
  preludeName: PreludeName
  hasStartingRumor: boolean
  mythos: IGameMythos[]
}

declare interface IGameInvestigator {
  name: InvestigatorName
  team: InvestigatorTeam
  isOut: boolean
}

declare interface IGameResultsFilled extends IGameResults {
  solvedMysteryCount: number
  time: number
}

declare interface IGameResultsWin extends IGameResults {
  isWin: true
}

declare interface IGameResultsLose extends IGameResults {
  isWin: false
}

declare interface IGameResultsFilledWin extends IGameResultsFilled {
  isWin: true
  scores: IScores
}

declare interface IGameResultsFilledLose extends IGameResultsFilled {
  isWin: false
  reason: ReasonName
}


declare interface IGame extends IGameNew {
  expansionNames: ExpansionName[]
  investigators?: IGameInvestigator[]
  rules?: IGameRules
}

declare interface IGameWin extends IGame {
  results: IGameResultsWin
}

declare interface IGameLose extends IGame {
  results: IGameResultsLose
}

declare interface IGameWinFilled extends IGameWin {
  results: IGameResultsWinFilled
}

declare interface IGameLoseFilled extends IGameLose {
  results: IGameResultsLoseFilled
}
