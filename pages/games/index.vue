<script setup lang="ts">
const GamesStore = useGamesStore()
const { gamesCount, worstScore, bestScore } = storeToRefs(GamesStore)
const { data: games, pending, error } = useAsyncData(() => GamesStore.getAll(), { server: false })

function detail(id: string) {
  navigateTo(`/games/${id}`)
}
</script>

<template>
<Head>
  <Title>My games</Title>
</Head>
<section>
  <h2>My games</h2>
  <NuxtLink to="/games/new">Create new game</NuxtLink>
  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Request failed with an error {{ error.message }}</p>
  <main v-else>
    <header>
      <span>All: {{ gamesCount }}</span>
      <span>Worst: {{ worstScore }}</span>
      <span>Best: {{ bestScore }}</span>
    </header>
    <div class="games">
      <div class="game" v-for="game in games" :key="game.id" @click="detail(game.id)">
        <div class="info">
          <div>{{ game.date }}</div>
          <div>{{ game.ancient }}</div>
          <div>{{ game.players }}</div>
        </div>
        <div class="result">
          <span v-if="game.result.winner">{{ calculateScore(game as IGameWinning) }}</span>
          <span>{{ game.result.winner }}</span>
        </div>
      </div>
    </div>
  </main>
</section>
</template>

<style scoped>
section {
  padding: 10px;
  border: 1px solid #111;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.games {
  display: flex;
  flex-wrap: wrap;
}

.game {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #111;
  width: 300px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
