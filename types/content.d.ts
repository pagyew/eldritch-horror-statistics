declare interface IAncient {
  name: string
  difficulty: number
  startingDoom: number
  mythosDeckSize: number
  expansion: string
}

declare interface IAncientPC {
  ancients: IAncient[]
}

declare interface IScores {
  [key: string]: string
}

declare interface IScoresPC {
  scores: IScores
}

declare type IReason = string

declare interface IReasonPC {
  reasons: IReason[]
}

declare interface IPrelude {
  name: string
  mechanic: string
  expansion: string
}

declare interface IPreludePC {
  preludes: IPrelude[]
}
