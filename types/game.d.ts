declare interface IGameNew {
  id: string
  date: string
  ancientName: AncientName
  playerCount: number
  isWin: boolean
}

declare interface IGame extends IGameNew {
  expansionNames: ExpansionName[]
  investigators: IGameInvestigator[]
  rules: IGameRules
  results: IGameWinResults | IGameLoseResults
}

declare interface IGameInvestigator {
  name: InvestigatorName
  team: InvestigatorTeam
  isOut: boolean
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
  startingRumor: boolean
  mythos: IGameMythos[]
}

declare type IGameMythos = 'easy' | 'normal' | 'hard'

declare interface IGameResults {
  solvedMysteryCount: number
  time: number
  comment?: string
  scores?: IScores
  reason?: ReasonName
}

declare interface IGameWinResults extends IGameResults {
  scores: IScores
}

declare interface IGameLoseResults extends IGameResults {
  reason: ReasonName
}

declare type IGameGeneralProps = Pick<IGame, 'id' | 'date' | 'ancientName' | 'playerCount'>
declare type IGameRulesProps = Pick<IGame, 'id' | 'rules'>
