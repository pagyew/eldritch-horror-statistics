<script lang="ts" setup>
const GamesStore = useGamesStore()
const { isLoading, start, finish } = useLoadingIndicator()

async function create(game: IGameNew) {
  start()

  await GamesStore.create(game)
  navigateTo(`/games/${game.id}`)

  finish()
}

function cancel() {
  navigateTo('/games')
}
</script>

<template>
<Head>
  <Title>Create a new game</Title>
</Head>
<NuxtLink to="/games">Back to My Games</NuxtLink>
<p v-if="isLoading">Creating...</p>
<GameNew @submit="create" @cancel="cancel" />
</template>

<style module></style>
