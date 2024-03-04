<script setup lang="ts">
const GamesStore = useGamesStore()
const gameId = useRoute().params.id as string
const { data: game, pending, error } = useAsyncData(() => GamesStore.getById(gameId), { server: false })

onUnmounted(() => GamesStore.$reset())
</script>

<template>
<Head>
  <Title>Game - {{ game?.ancient }}</Title>
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
        <span>{{ game.ancient }}</span>
      </div>
      <div class="line">
        <span>Players</span>
        <span>{{ game.players }}</span>
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
        <span>{{ game.rules.mythos.join(', ') }}</span>
      </div>
      <div class="line">
        <span>Rumor</span>
        <span>{{ game.rules.startingRumor }}</span>
      </div>
    </div>
    <div class="block investigators">
      <h3>Investigators</h3>
      <ul>
        <li v-for="investigator in game.investigators" :key="investigator">
          {{ investigator }}
        </li>
      </ul>
    </div>
    <div class="block result">
      <h3>Result</h3>
      <p>{{ game.result.winner }}</p>
      <p>{{ formatTime(game.result.time) }}</p>
      <p>Solved mysteries: {{ game.result.solvedMysteries }}</p>
      <div v-if="game.result.winner">
        <div class="line" v-for="(score, name) in game.result.scoring" :key="name">
          <span>{{ SCORE[upper(name)] }}</span>
          <span>{{ score }}</span>
        </div>
      </div>
      <div v-else>{{ game.result.reason }}</div>
      <p v-if="game.result.comment">{{ game.result.comment }}</p>
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
