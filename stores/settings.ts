export const useSettingsStore = defineStore('settings', () => {
  const settings = useEHSStorage<ISettings>('settings', {
    expansions: [EXPANSION.CORE],
    theme: THEME.SYSTEM,
    language: LANGUAGE.ENGLISH
  })

  function setExpansions(newExpansions: ExpansionName[]) {
    return settings.value.expansions = newExpansions
  }

  function setTheme(newTheme: ThemeName) {
    return settings.value.theme = newTheme
  }

  function setLanguage(newLanguage: LanguageName) {
    return settings.value.language = newLanguage
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGamesStore, import.meta.hot))
  }

  return {
    settings: skipHydrate(settings),
    setExpansions,
    setTheme,
    setLanguage
  }
})
