<script setup lang="ts">
</script>

<template>
<header :class="css.header">
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">Home page</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/games">My Games</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/expansions">My Expansions</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/statistics">My Statistics</NuxtLink>
      </li>
    </ul>
  </nav>
  <AppSettings />
</header>
</template>

<style module="css">
.header {
  border: 1px solid black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
