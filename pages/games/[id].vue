<script setup lang="ts">
const GamesStore = useGamesStore()
const gameId = useRoute().params.id as string
const {
  data: game,
  pending,
  error
} = useLazyAsyncData(() => GamesStore.getById(gameId), { server: false })

onUnmounted(() => GamesStore.$reset())
</script>

<template>
  <Head>
    <Title>Game - {{ game?.ancient }}</Title>
  </Head>
  <h2>Game: {{ gameId }}</h2>
  <NuxtLink to="/games">Back to My Games</NuxtLink>
  <p v-if="pending">Loading...</p>
  <pre v-else-if="error">{{ error }}</pre>
  <p v-else-if="!game">Game with id {{ gameId }} not found</p>
  <pre v-else>{{ JSON.stringify(game, null, 2) }}</pre>
</template>

<style scoped>
</style>
