<script lang="ts" setup>
const SettingsStore = useSettingsStore()
const { settings } = storeToRefs(SettingsStore)
const { expansions, theme, language } = settings.value

function selectExpansions(expansions: ExpansionName[]) {
  SettingsStore.setExpansions(expansions)
}

function selectTheme(theme: ThemeName) {
  SettingsStore.setTheme(theme)
}

function selectLanguage(language: LanguageName) {
  SettingsStore.setLanguage(language)
}
</script>

<template>
<div :class="css.container">
  <h2>Settings</h2>
  <div :class="css.wrapper">
    <UiSelectExpansions :class="css.expansions" :selected="expansions" @select="selectExpansions" />
    <UiSelectTheme :class="css.theme" :selected="theme" @select="selectTheme" />
    <UiSelectLanguage :class="css.language" :selected="language" @select="selectLanguage" />
  </div>
</div>
</template>


<style module="css">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0 20px 20px;
  width: max-content;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "expansions theme"
    "expansions language";
  gap: 20px;
}

.expansions {
  grid-area: expansions;
}

.theme {
  grid-area: theme;
}

.language {
  grid-area: language;
}
</style>
