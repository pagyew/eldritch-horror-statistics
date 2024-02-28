<script setup lang="ts">
const GamesStore = useGamesStore()
const { game } = storeToRefs(GamesStore)
const gameId = useRoute().params.id as string
const { pending, error } = useAsyncData(() => GamesStore.getGame(gameId))

useSeoMeta({
  title: `Game #${gameId}`
})

onUnmounted(() => GamesStore.$reset())
</script>

<template>
  <h2>Game: {{ gameId }}</h2>
  <NuxtLink to="/games">Back to My Games</NuxtLink>
  <p v-if="pending">Loading...</p>
  <pre v-else-if="error">{{ error }}</pre>
  <p v-else-if="!game">Game with id {{ gameId }} not found</p>
  <pre v-else>{{ JSON.stringify(game, null, 2) }}</pre>
</template>

<style scoped>
</style>
