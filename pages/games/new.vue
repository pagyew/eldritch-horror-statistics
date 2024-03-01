<script lang="ts" setup>
const GamesStore = useGamesStore()
const id = crypto.randomUUID()
const { isLoading, start, finish } = useLoadingIndicator()

function submit(data: any) {
  start()

  GamesStore.create({ id, ...data } as IGame)
  navigateTo(`/games/${id}`)

  finish()
}
</script>

<template>
  <Head>
    <Title>Create a new game</Title>
  </Head>
  <NuxtLink to="/games">Back to My Games</NuxtLink>
  <p v-if="isLoading">Creating...</p>
  <GameForm @submit="submit" />
</template>

<style scoped>
</style>
