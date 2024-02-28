<script setup lang="ts">
const GamesStore = useGamesStore()
const { games, gamesCount, worstScore, bestScore } = storeToRefs(GamesStore)
const { pending, error } = useAsyncData(() => GamesStore.getAllGames())

useSeoMeta({
  title: 'My games'
})
</script>

<template>
  <section>
    <h2>My games</h2>
    <p v-if="pending">Loading...</p>
    <p v-else-if="error">Request failed with an error {{ error.message }}</p>
    <div v-else>
      <NuxtLink to="/games/new">Create new game</NuxtLink>
      <header>
        <span>All: {{ gamesCount }}</span>
        <span>Worst: {{ worstScore }}</span>
        <span>Best: {{ bestScore }}</span>
      </header>
      <div>
        <table>
          <thead align="left">
            <tr>
              <th>Detail</th>
              <th>Date</th>
              <th>Ancient</th>
              <th>Players</th>
              <th>Time</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in games" :key="game.id">
              <td>
                <button @click="navigateTo('/games/' + game.id)">
                  detail {{ index }}
                </button>
              </td>
              <td>{{ game.date }}</td>
              <td>{{ game.ancient }}</td>
              <td>{{ game.players }}</td>
              <td>{{ new Date(game.result.time).toISOString().slice(11, 16) }}</td>
              <td>{{ game.result.winner }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 10px;
  border: 1px solid #111;
  width: min(500px, 100% - 22px)
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

table {
  border: 1px solid #222;
  padding: 10px;
  width: 100%;
}
</style>
