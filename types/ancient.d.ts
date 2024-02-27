declare type AncientName = typeof ANCIENT[keyof typeof ANCIENT]

declare interface IAncient {
  name: AncientName
  difficulty: number
  startingDoom: number
  mythosDeckSize: number
  expansion: ExpansionName
}
