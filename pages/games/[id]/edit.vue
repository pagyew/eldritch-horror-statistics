<script setup lang="ts">
const GamesStore = useGamesStore()
const gameId = useRoute().params.id as string
const { data: game, pending, error } = useAsyncData(() => GamesStore.getById(gameId), { server: false })
const { isLoading, start, finish } = useLoadingIndicator()

function cancel() {
  navigateTo(`/games/${gameId}`)
}

function save(data: any) {
  start()

  GamesStore.update({ id: gameId, ...data } as IGame)
  navigateTo(`/games/${gameId}`)

  finish()
}
</script>

<template>
<Head>
  <Title>Editing Game - {{ game?.ancientName }}</Title>
</Head>
<h2>Game: {{ gameId }}</h2>
<p v-if="isLoading">Saving...</p>
<p v-if="pending">Loading...</p>
<pre v-else-if="error">{{ error }}</pre>
<p v-else-if="!game">Game with id {{ gameId }} not found</p>
<GameForm v-else @submit="save" @cancel="cancel" editing v-bind="game" />
</template>

<style module></style>
