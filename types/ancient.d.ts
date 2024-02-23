declare interface IAncient {
  name: string
  difficulty: number
  startingDoom: number
  mythosDeckSize: number
  expansion: string
}

declare interface IAncientPC {
  body: IAncient[]
}
