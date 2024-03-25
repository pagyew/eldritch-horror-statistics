<script lang="ts" setup>
const GamesStore = useGamesStore()
const SettingsStore = useSettingsStore()
const { settings } = storeToRefs(SettingsStore)

const { isLoading, start, finish } = useLoadingIndicator()

let expansions = ref(settings.value.expansions)

function onSelectExpansions(newExpansions: ExpansionName[]) {
  expansions.value = newExpansions
}

async function onSubmit(newGame: IGameNew) {
  start()

  await GamesStore.create(extend(newGame, 'expansions', settings.value.expansions))
  navigateTo(`/games/${newGame.id}`)

  finish()
}

function onCancel() {
  navigateTo('/games')
}
</script>

<template>
<Head>
  <Title>Create a new game</Title>
</Head>
<NuxtLink to="/games">Back to My Games</NuxtLink>
<p v-if="isLoading">Creating...</p>
<div :class="css.container">
  <GameNew :expansions="expansions" @submit="onSubmit" @cancel="onCancel" />
  <UiSelectExpansions :selected="expansions" @select="onSelectExpansions" />
</div>
</template>

<style module="css">
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: stretch;
}
</style>
