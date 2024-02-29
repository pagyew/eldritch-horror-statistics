<script lang="ts" setup>
const GamesStore = useGamesStore()
const id = crypto.randomUUID()
const ancientNames = Object.values(ANCIENT)
const preludeNames = ['None', ...Object.values(PRELUDE)]
const reasonNames = Object.values(REASON)
const { isLoading, start, finish } = useLoadingIndicator()

async function handleSubmit(form$: Vueform) {
  start()

  GamesStore.create({ id, ...form$.requestData } as IGame)
  navigateTo('/games/' + id)

  finish()
}
</script>

<template>
  <Head>
    <Title>Create a new game</Title>
  </Head>
  <div class="container">
    <ClientOnly>
      <p v-if="isLoading">Creating...</p>
      <Vueform v-else class="form" size="sm" :endpoint="false" @submit="handleSubmit">
        <StaticElement name="head" tag="h2" content="Create new game" />
        <StaticElement name="divider" tag="hr" />
        <StaticElement name="general_title" tag="h3" content="General" />
        <!-- Date -->
        <DateElement name="date" label="Date" rules="required" :default="new Date()" />
        <!-- Ancient -->
        <SelectElement name="ancient" label="Ancient One" :default="ancientNames[0]" :items="ancientNames" />
        <!-- Players -->
        <SelectElement name="players" label="Number of players" :default="4" :items="[1, 2, 3, 4, 5, 6, 7, 8]" />
        <!-- Additional Rules -->
        <ObjectElement name="rules">
          <StaticElement name="additional" content="Additional Rules" tag="h3" />
          <!-- Prelude -->
          <SelectElement name="prelude" label="Prelude" :default="preludeNames[0]" :items="preludeNames" view="blocks" />
          <!-- Mythos -->
          <CheckboxgroupElement name="mythos" label="Mythos" :default="['easy', 'normal', 'hard']"
            :items="['easy', 'normal', 'hard']" view="blocks" />
        </ObjectElement>
        <!-- Result -->
        <StaticElement name="result_title" content="Result" tag="h3" />
        <ObjectElement name="result">
          <!-- Winner -->
          <ToggleElement name="winner" text="Defeat" />
          <!-- TODO: EHS-2 -->
          <!-- Solved Mysteries -->
          <RadiogroupElement name="solvedMysteries" label="Number of solved mysteries" :default="1" :items="[0, 1, 2, 3]"
            view="tabs" />
          <!-- Time -->
          <SliderElement name="time" label="Time" :default="toMs({ h: 4 })" type="number" :min="0" :max="toMs({ h: 24 })"
            :step="toMs({ m: 15 })" show-tooltip="always" :format="formatTime" />
          <!-- Comments -->
          <TextareaElement name="comment" label="Comment" placeholder="It was terrible..." />
          <!-- Reason for defeat -->
          <RadiogroupElement name="reason" label="Reason for defeat" :default="reasonNames[0]" :items="reasonNames"
            :conditions="[['result.winner', false]]" view="blocks" />
          <!-- Scoring -->
          <ObjectElement name="scoring" :conditions="[['result.winner', true]]">
            <StaticElement name="scoring_title" content="Scoring" tag="h4" />
            <!-- TODO: Add rules required|integer|min:0
              when issue was closed https://github.com/vueform/vueform/issues/149 -->
            <TextElement v-for="(title, label) in SCORE" :key="label" :name="label.toLowerCase()" :label="title"
              :default="0" input-type="number" :format-data="(n: string, v: any) => ({ [n]: +v })" />
          </ObjectElement>
        </ObjectElement>
        <!-- Submit button -->
        <ButtonElement name="submit" submits>Create game</ButtonElement>
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
