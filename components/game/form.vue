<script setup lang="ts">
const ancientNames = Object.values(ANCIENT)
const investigators = INVESTIGATORS.map(({ name, specialization }) => ({
  value: name,
  label: name,
  description: specialization
}))
const preludeNames = [{ value: null, label: 'None' }, ...Object.values(PRELUDE)]
const reasonNames = Object.values(REASON)
const mythos = ['easy', 'normal', 'hard']

const emits = defineEmits(['submit', 'cancel'])
const { editing, game } = defineProps({
  editing: {
    type: Boolean,
    default: false
  },
  game: {
    type: Object as PropType<IGame>,
    default: () => ({
      date: new Date(),
      ancientName: ANCIENT.AZATHOTH,
      expansionNames: [],
      investigatorNames: [],
      playerCount: 4,
      rules: {
        preludeName: 'None',
        startingRumor: false,
        mythos: [
          'easy',
          'normal',
          'hard'
        ],
      },
      isWin: false,
      results: {
        comment: '',
        solvedMysteryCount: 1,
        time: toMs({ h: 4 }),
        reason: REASON.SURRENDER,
        scores: Object.fromEntries(
          Object.entries(SCORE)
            .map(([k]) => [lower(k), 0])
        )
      }
    })
  }
})

const title = computed(() => editing ? 'Edit game' : 'Create new game')
const action = computed(() => editing ? 'Save' : 'Create game')

function submit(form$: Vueform) {
  emits('submit', form$.requestData)
}

function cancel() {
  emits('cancel')
}
</script>

<template>
<header>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/games">Back to My Games</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/games/${game.id}`">Back to preview</NuxtLink>
      </li>
    </ul>
  </nav>
</header>
<div class="container">
  <ClientOnly>
    <Vueform class="form" :endpoint="false" @submit="submit">
      <StaticElement name="head" tag="h2" :content="title" />
      <StaticElement name="divider" tag="hr" />
      <GroupElement class="group" name="general" :columns="6">
        <StaticElement name="general_title" tag="h3" content="General" />
        <!-- Date -->
        <DateElement name="date" label="Date" rules="required" :default="game.date" display-format="MMMM DD, YYYY" />
        <!-- Ancient -->
        <SelectElement name="ancient" label="Ancient One" :default="game.ancientName" :items="ancientNames" />
        <!-- Players -->
        <SelectElement name="players" label="Number of players" :default="game.playerCount"
          :items="[1, 2, 3, 4, 5, 6, 7, 8]" />
      </GroupElement>
      <GroupElement class="group" name="rules" :columns="6">
        <!-- Additional Rules -->
        <ObjectElement name="rules">
          <StaticElement name="additional" content="Additional Rules" tag="h3" />
          <!-- Prelude -->
          <SelectElement name="prelude" label="Prelude" :default="game.rules?.preludeName" :items="preludeNames" />
          <!-- Starting Rumor -->
          <ToggleElement name="startingRumor" label="Starting rumor" :default="game.rules?.hasStartingRumor" />
          <!-- Mythos -->
          <CheckboxgroupElement name="mythos" label="Mythos" :default="game.rules?.mythos" :items="mythos"
            view="blocks" />
        </ObjectElement>
      </GroupElement>
      <GroupElement class="group" name="investigaters" :columns="6">
        <!-- Investigators -->
        <StaticElement name="investigators_title" content="Investigators" tag="h3" />
        <!-- TODO: Refactor this shit -->
        <CheckboxgroupElement name="investigators" :default="game.investigatorNames" :items="investigators"
          view="blocks" :add-classes="{
          CheckboxgroupCheckbox: {
            container: 'vf-col-3'
          }
        }" :replace-class="{
          wrapper: {
            'vf-checkboxgroup-blocks-wrapper': 'vf-layout-inner-container'
          }
        }" />
      </GroupElement>
      <GroupElement class="group" name="results" :columns="6">
        <!-- Results -->
        <StaticElement name="results_title" content="Result" tag="h3" />
        <ObjectElement name="results">
          <!-- Winner -->
          <ToggleElement name="winner" text="Defeat" :default="game.isWin" />
          <!-- TODO: EHS-2 -->
          <!-- Solved Mysteries -->
          <RadiogroupElement name="solvedMysteries" label="Number of solved mysteries"
            :default="game.results?.solvedMysteryCount" :items="[0, 1, 2, 3]" view="tabs" />
          <!-- Time -->
          <SliderElement name="time" label="Time" :default="game.results?.time" type="number" :min="0"
            :max="toMs({ h: 24 })" :step="toMs({ m: 15 })" show-tooltip="always" :format="formatTime" />
          <!-- Comments -->
          <TextareaElement name="comment" label="Comment" placeholder="It was terrible..."
            :default="game.results?.comment" />
          <!-- Reason for defeat -->
          <RadiogroupElement name="reason" label="Reason for defeat" :default="game.results?.reason"
            :items="reasonNames" :conditions="[['results.results.winner', false]]" view="blocks" />
          <!-- Scoring -->
          <ObjectElement name="scores" :conditions="[['results.results.winner', true]]">
            <StaticElement name="scores_title" content="Scoring" tag="h4" />
            <!-- TODO: Add rules required|integer|min:0
                  when issue was closed https://github.com/vueform/vueform/issues/149 -->
            <TextElement v-for="(title, label) in SCORE" :key="label" :name="lower(label)" :label="title"
              :default="game.results?.scores?.[lower(label)]" input-type="number" rules="required|integer|min:0" />
          </ObjectElement>
        </ObjectElement>
      </GroupElement>
      <StaticElement name="divider" tag="hr" />
      <!-- Submit button -->
      <GroupElement name="buttons">
        <ButtonElement name="submit" :button-label="action" submits :columns="3" full />
        <ButtonElement v-if="editing" name="cancel" button-label="Cancel" secondary @click="cancel" :columns="3" full />
      </GroupElement>
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
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}

.group {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
