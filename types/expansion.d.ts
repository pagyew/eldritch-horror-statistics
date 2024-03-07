declare type ExpansionName = typeof EXPANSION[keyof typeof EXPANSION]

declare interface IExpansion {
  name: ExpansionName
  releaseYear: number
  logoUrl?: string
  posterUrl: string
  ancinets: AncientName[]
  investigators: InvestigatorName[]
  preludes: PreludeName[]
}
