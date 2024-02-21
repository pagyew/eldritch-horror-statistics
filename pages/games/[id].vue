<script setup lang="ts">
const route = useRoute()
const GamesStore = useGamesStore()
const { game } = storeToRefs(GamesStore)
const gameId = Number(route.params.id)

const { pending, error } = useAsyncData(
  `game:${gameId}`,
  () => GamesStore.getGame(gameId),
  {
    server: false,
    getCachedData(key) {
      return game.value = useNuxtData(key).data.value
    }
  }
)

onUnmounted(() => GamesStore.$reset())
</script>

<template>
  <h2>Game: {{ gameId }}</h2>
  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Error: {{ error.message }}</p>
  <p v-else-if="game == null">Game with id {{ gameId }} not found</p>
  <pre v-else>{{ JSON.stringify(game, null, 2) }}</pre>
</template>

<style scoped>
</style>
