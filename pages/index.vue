<script setup lang="ts">
const games = useGamesStore().games
</script>

<template>
<section>
  <h2>Home page</h2>
  <pre>{{ games }}</pre>
</section>
</template>

<style scoped></style>
