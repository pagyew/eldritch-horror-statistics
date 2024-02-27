declare type PreludeName = typeof PRELUDE[keyof typeof PRELUDE]

declare interface IPrelude {
  name: PreludeName
  mechanic: string
  expansion: ExpansionName
}
