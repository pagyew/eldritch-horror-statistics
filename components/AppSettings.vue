<script lang="ts" setup>
function selectExpansions(expansions: ExpansionName[]) {
  console.log(expansions)
}

function selectTheme(theme: ThemeName) {
  console.log(theme)
}

function selectLanguage(language: LanguageName) {
  console.log(language);
}
</script>

<template>
<div :class="$style.container">
  <h2>Settings</h2>
  <div :class="$style.wrapper">
    <UiExpansionsSelect :class="$style.expansions" @select="selectExpansions" />
    <UiThemeSelect :class="$style.theme" @select="selectTheme" />
    <UiLanguageSelect :class="$style.language" @select="selectLanguage" />
  </div>
</div>
</template>


<style module>
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
