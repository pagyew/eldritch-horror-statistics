<script setup lang="ts">
const GamesStore = useGamesStore()
const gameId = useRoute().params.id as string
const { game } = storeToRefs(GamesStore)
const { pending, error } = useAsyncData(() => GamesStore.getById(gameId), { server: false })

const visibleBlock = ref<IGameBlock | null>(null)

function onEditClick(blockName: IGameBlock) {
  closeAll()
  visibleBlock.value = blockName
}

function updateGame<T extends IGameBlock>(type: T, options: IGameBlocks[T]) {
  if (game.value) {
    GamesStore.update({ ...game.value, [type]: options })
    if (type !== 'investigators') closeAll()
  }
}

function closeAll() {
  visibleBlock.value = null
}

onUnmounted(() => GamesStore.$reset())
</script>

<template>
<Head>
  <Title>Game - {{ game?.general.ancientName }}</Title>
</Head>
<h2>Game: {{ gameId }}</h2>
<header>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/games">Back to My Games</NuxtLink>
      </li>
    </ul>
  </nav>
</header>
<main>
  <p v-if="pending">Loading...</p>
  <pre v-else-if="error">{{ error }}</pre>
  <p v-else-if="!game">Game with id {{ gameId }} not found</p>
  <section v-else :class="css.section">
    <!-- Comment -->
    <GameComment v-if="visibleBlock === 'comment'" v-bind="game" @submit="updateGame" @close="closeAll" />
    <ViewGameComment v-else v-bind="game" @edit-click="onEditClick" />
    <!-- General -->
    <GameGeneral v-if="visibleBlock === 'general'" v-bind="game.general" @submit="updateGame" @cancel="closeAll" />
    <ViewGameGeneral v-else v-bind="game.general" @edit-click="onEditClick" />
    <!-- Rules -->
    <GameRules v-if="visibleBlock === 'rules'" v-bind="game.rules" @submit="updateGame" @cancel="closeAll" />
    <ViewGameRules v-else v-bind="game.rules" @edit-click="onEditClick" />
    <!-- Investigators -->
    <GameInvestigators v-if="visibleBlock === 'investigators'" v-bind="game" @change="updateGame" @close="closeAll" />
    <ViewGameInvestigators v-else :investigators="game.investigators" @edit-click="onEditClick" />
    <!-- Results -->
    <GameResults v-if="visibleBlock === 'results'" v-bind="game.results" @submit="updateGame" @cancel="closeAll" />
    <ViewGameResults v-else v-bind="game.results" @edit-click="onEditClick" />
  </section>
</main>
</template>

<style module="css">
.section {
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
