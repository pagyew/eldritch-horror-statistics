<script setup lang="ts">
const GamesStore = useGamesStore()
const gameId = useRoute().params.id as string
const form$ = ref<Vueform | null>(null)
const ancientNames = Object.values(ANCIENT)
const preludeNames = ['None', ...Object.values(PRELUDE)]
const reasonNames = Object.values(REASON)
const { data: game, pending, error } = useAsyncData(() => GamesStore.getById(gameId), { server: false })
const { isLoading, start, finish } = useLoadingIndicator()

function cancel() {
  navigateTo(`/games/${gameId}`)
}

function save(form$: Vueform) {
  start()

  GamesStore.update({ id: gameId, ...form$.requestData } as IGame)
  navigateTo(`/games/${gameId}`)

  finish()
}

watchOnce([game], () => {
  if (game.value) {
    form$.value?.update(game.value)
  }
})
</script>

<template>
  <Head>
    <Title>Editing Game - {{ game?.ancient }}</Title>
  </Head>
  <h2>Game: {{ gameId }}</h2>
  <button @click="cancel">Cancel</button>
  <p v-if="pending">Loading...</p>
  <pre v-else-if="error">{{ error }}</pre>
  <p v-else-if="!game">Game with id {{ gameId }} not found</p>
  <div class="container">
    <ClientOnly>
      <p v-if="isLoading">Saving...</p>
      <Vueform v-else class="form" ref="form$" size="sm" :endpoint="false" @submit="save">
        <StaticElement name="head" tag="h2" content="Edit game" />
        <StaticElement name="divider" tag="hr" />
        <StaticElement name="general_title" tag="h3" content="General" />
        <!-- Date -->
        <DateElement name="date" label="Date" rules="required" />
        <!-- Ancient -->
        <SelectElement name="ancient" label="Ancient One" :items="ancientNames" />
        <!-- Players -->
        <SelectElement name="players" label="Number of players" :items="[1, 2, 3, 4, 5, 6, 7, 8]" />
        <!-- Additional Rules -->
        <ObjectElement name="rules">
          <StaticElement name="additional" content="Additional Rules" tag="h3" />
          <!-- Prelude -->
          <SelectElement name="prelude" label="Prelude" :items="preludeNames" view="blocks" />
          <!-- Mythos -->
          <CheckboxgroupElement name="mythos" label="Mythos" :items="['easy', 'normal', 'hard']" view="blocks" />
        </ObjectElement>
        <!-- Result -->
        <StaticElement name="result_title" content="Result" tag="h3" />
        <ObjectElement name="result">
          <!-- Winner -->
          <ToggleElement name="winner" text="Defeat" />
          <!-- TODO: EHS-2 -->
          <!-- Solved Mysteries -->
          <RadiogroupElement name="solvedMysteries" label="Number of solved mysteries" :items="[0, 1, 2, 3]"
            view="tabs" />
          <!-- Time -->
          <SliderElement name="time" label="Time" type="number" :min="0" :max="toMs({ h: 24 })" :step="toMs({ m: 15 })"
            show-tooltip="always" :format="formatTime" />
          <!-- Comments -->
          <TextareaElement name="comment" label="Comment" placeholder="It was terrible..." />
          <!-- Reason for defeat -->
          <RadiogroupElement name="reason" label="Reason for defeat" :items="reasonNames"
            :conditions="[['result.winner', false]]" view="blocks" />
          <!-- Scoring -->
          <ObjectElement name="scoring" :conditions="[['result.winner', true]]">
            <StaticElement name="scoring_title" content="Scoring" tag="h4" />
            <!-- TODO: Add rules required|integer|min:0
              when issue was closed https://github.com/vueform/vueform/issues/149 -->
            <TextElement v-for="(title, label) in SCORE" :key="label" :name="label.toLowerCase()" :label="title"
              input-type="number" :format-data="(n: string, v: any) => ({ [n]: +v })" />
          </ObjectElement>
        </ObjectElement>
        <!-- Submit button -->
        <ButtonElement name="submit" submits>Save game</ButtonElement>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.form {
  width: 50%;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
