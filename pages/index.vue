<script setup lang="ts">
const GamesStore = useGamesStore()
const { data: games, pending, error } = useAsyncData(() => GamesStore.getAll(), { server: false })
</script>

<template>
<section>
  <h2>Home page</h2>
  <p v-if="pending">Loading...</p>
  <p v-if="error">Error: {{ error }}</p>
  <pre v-else>{{ games }}</pre>
</section>
</template>

<style module></style>
