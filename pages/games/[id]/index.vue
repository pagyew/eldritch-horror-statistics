<script setup lang="ts">
const GamesStore = useGamesStore()
const gameId = useRoute().params.id as string
const { data: game, pending, error } = useAsyncData(() => GamesStore.getById(gameId), { server: false })

onUnmounted(() => GamesStore.$reset())
</script>

<template>
<Head>
  <Title>Game - {{ game?.ancientName }}</Title>
</Head>
<h2>Game: {{ gameId }}</h2>
<header>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/games">Back to My Games</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/games/${gameId}/edit`">Edit this game</NuxtLink>
      </li>
    </ul>
  </nav>
</header>
<main>
  <p v-if="pending">Loading...</p>
  <pre v-else-if="error">{{ error }}</pre>
  <p v-else-if="!game">Game with id {{ gameId }} not found</p>
  <section v-else>
    <div class="block general">
      <h3>General</h3>
      <div class="line">
        <span>Ancient</span>
        <span>{{ game.ancientName }}</span>
      </div>
      <div class="line">
        <span>Players</span>
        <span>{{ game.playerCount }}</span>
      </div>
      <div class="line">
        <span>Date</span>
        <span>{{ game.date }}</span>
      </div>
    </div>
    <div class="block rules">
      <h3>Rules</h3>
      <div class="line">
        <span>Mythos</span>
        <span>{{ join(game.rules?.mythos) }}</span>
      </div>
      <div class="line">
        <span>Rumor</span>
        <span>{{ game.rules?.startingRumor }}</span>
      </div>
    </div>
    <div class="block investigators">
      <h3>Investigators</h3>
      <ul>
        <li v-for="investigator in game.investigatorNames" :key="investigator">
          {{ investigator }}
        </li>
      </ul>
    </div>
    <div class="block results">
      <h3>Results</h3>
      <p>{{ game.isWin }}</p>
      <p>{{ formatTime(game.results?.time ?? 0) }}</p>
      <p>Solved mysteries: {{ game.results?.solvedMysteryCount }}</p>
      <div v-if="game.isWin">
        <div class="line" v-for="(score, name) in game.results?.scores" :key="name">
          <span>{{ SCORE[upper(name)] }}</span>
          <span>{{ score }}</span>
        </div>
      </div>
      <div v-else>{{ game.results?.reason }}</div>
      <p v-if="game.results?.comment">{{ game.results?.comment }}</p>
    </div>
  </section>
</main>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

.block {
  border: 1px solid #ccc;
  padding: 10px;
}

.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
