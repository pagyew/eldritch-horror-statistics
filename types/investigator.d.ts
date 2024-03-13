declare type InvestigatorName = typeof INVESTIGATOR[keyof typeof INVESTIGATOR]
declare type InvestigatorTeam = 'initial' | 'replacement'

declare interface IInvestigator {
  name: InvestigatorName
  expansion: ExpansionName
  specialization: string
  imageUrl: string
}
