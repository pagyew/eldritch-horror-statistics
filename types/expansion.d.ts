declare type ExpansionName = typeof EXPANSION[keyof typeof EXPANSION]

declare interface IExpansion {
  name: ExpansionName
  ancinets: AncientName[]
  investigators: InvestigatorName[]
  preludes: PreludeName[]
}
