<script lang="ts" setup>
import type { Vueform } from '@vueform/vueform'

const ContentStore = useContentStore()
const GamesStore = useGamesStore()
const { ancients } = storeToRefs(ContentStore)
const { pending, error } = useAsyncData(() => ContentStore.getAllAncients())
const ancientNames = computed(() => ancients.value.map(ancient => ancient.name))
const { isLoading, start, finish } = useLoadingIndicator()

// TODO: EHS-1
async function handleSubmit(form$: Vueform) {
  start()
  const requestData = form$.requestData
  console.log({ requestData })
  finish()
}
</script>

<template>
  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Error: {{ error }}</p>
  <div v-else class="container">
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
        <SelectElement name="players" label="Number of players" default="4" :items="[1, 2, 3, 4, 5, 6, 7, 8]" />
        <!-- Result -->
        <StaticElement name="result_title" content="Result" tag="h3" />
        <ObjectElement name="result">
          <!-- Winner -->
          <ToggleElement name="winner" text="Defeat" />
          <!-- TODO: EHS-2 -->
          <!-- Solved Mysteries -->
          <RadiogroupElement name="solvedMysteries" label="Number of solved mysteries" default="1" :items="[0, 1, 2, 3]"
            view="tabs" />
          <!-- Comments -->
          <TextareaElement name="comment" label="Comment" placeholder="It was terrible..." />
          <!-- Reason for defeat -->
          <TextElement name="reason" label="Reason for defeat" rules="required"
            :conditions="[['result.winner', false]]" />
          <!-- Scoring -->
          <ObjectElement name="scoring" :conditions="[['result.winner', true]]">
            <StaticElement name="scoring_title" content="Scoring" tag="h4" />
            <TextElement name="points" label="Points" rules="required|min:0" default="0" type="number"
              input-type="number" />
            <TextElement name="penalty" label="Penalty" rules="required|min:0" default="0" type="number"
              input-type="number" />
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
