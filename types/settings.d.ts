declare type ThemeName = typeof THEME[keyof typeof THEME]

declare type LanguageName = typeof LANGUAGE[keyof typeof LANGUAGE]

declare interface ISettings {
  expansions: ExpansionName[]
  theme: ThemeName
  language: LanguageName
}
