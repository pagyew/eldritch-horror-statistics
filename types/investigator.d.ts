declare type InvestigatorName = typeof INVESTIGATOR[keyof typeof INVESTIGATOR]

declare interface IInvestigator {
  name: InvestigatorName
  expansion: ExpansionName
  specialization: string
}
