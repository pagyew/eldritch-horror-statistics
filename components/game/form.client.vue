<script setup lang="ts">
import type { RadiogroupElement } from '@vueform/vueform'

let mystery$: Nullable<RadiogroupElement> = null
const ancientNames = Object.values(ANCIENT)
const investigatorCards = INVESTIGATORS
  .map(pick('name:value', 'name:label', 'specialization:description'))
const preludeNames = [{ value: null, label: 'None' }, ...Object.values(PRELUDE)]
const reasonNames = Object.values(REASON)
const mythos = ['easy', 'normal', 'hard']

const emits = defineEmits(['submit', 'cancel'])
const props = withDefaults(defineProps<{
  editing: boolean
  id: string
  general: IGameGeneral
  expansionNames?: ExpansionName[]
  investigators?: IGameInvestigator[]
  rules?: IGameRules
  results: IGameResults
}>(), {
  editing: false,
  expansionNames: () => [],
  investigators: () => [],
  rules: () => ({
    preludeName: 'None',
    hasStartingRumor: false,
    mythos: [
      'easy',
      'normal',
      'hard'
    ],
  }),
  results: () => ({
    isWin: false,
    solvedMysteryCount: 1,
    time: toMs({ h: 4 }),
    reason: REASON.SURRENDER
  })
})
const { editing, id, general, expansionNames, investigators, rules, results } = toRefs(props)

const title = computed(() => editing.value ? 'Edit game' : 'Create new game')
const action = computed(() => editing.value ? 'Save' : 'Create game')

function submit(form$: Vueform) {
  emits('submit', form$.requestData)
}

function cancel() {
  emits('cancel')
}

function onFormMounted(form$: Vueform) {
  mystery$ = form$.el$('results.results.solvedMysteryCount') as unknown as RadiogroupElement

  if (!mystery$?.data) {
    mystery$?.update(results.value.isWin ? 3 : 1)
  }
}

function onWinChange(newValue: boolean) {
  if (newValue) {
    mystery$?.update(3)
    mystery$?.disable([0, 1, 2])
  } else {
    mystery$?.update(1)
    mystery$?.enableAll()
  }
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
        <NuxtLink :to="`/games/${id}`">Back to preview</NuxtLink>
      </li>
    </ul>
  </nav>
</header>
<div :class="css.container">
  <Vueform :class="css.form" ref="form$" :endpoint="false" @submit="submit" @mounted="onFormMounted">
    <StaticElement name="head" tag="h2" :content="title" />
    <StaticElement name="divider" tag="hr" />
    <GroupElement :class="css.group" name="general" :columns="6">
      <StaticElement name="general_title" tag="h3" content="General" />
      <ObjectElement name="general">
        <!-- Date -->
        <DateElement name="date" label="Date" rules="required" :default="general.date" display-format="MMMM DD, YYYY" />
        <!-- Ancient -->
        <SelectElement name="ancientName" label="Ancient One" :default="general.ancientName" :items="ancientNames" />
        <!-- Players -->
        <SelectElement name="playerCount" label="Number of players" :default="general.playerCount"
          :items="[1, 2, 3, 4, 5, 6, 7, 8]" />
      </ObjectElement>
    </GroupElement>
    <GroupElement :class="css.group" name="rules" :columns="6">
      <!-- Additional Rules -->
      <ObjectElement name="rules">
        <StaticElement name="additional" content="Additional Rules" tag="h3" />
        <!-- Prelude -->
        <SelectElement name="preludeName" label="Prelude" :default="rules.preludeName" :items="preludeNames" />
        <!-- Starting Rumor -->
        <ToggleElement name="hasStartingRumor" label="Starting rumor" :default="rules.hasStartingRumor" />
        <!-- Mythos -->
        <CheckboxgroupElement name="mythos" label="Mythos" :default="rules.mythos" :items="mythos" view="blocks" />
      </ObjectElement>
    </GroupElement>
    <GroupElement :class="css.group" name="investigators" :columns="6">
      <!-- Investigators -->
      <StaticElement name="investigators_title" content="Investigators" tag="h3" />
      <!-- TODO: Refactor this shit -->
      <CheckboxgroupElement name="investigators" :default="investigators" :items="investigatorCards" view="blocks"
        :add-classes="{
          CheckboxgroupCheckbox: {
            container: 'vf-col-3'
          }
        }" :replace-class="{
          wrapper: {
            'vf-checkboxgroup-blocks-wrapper': 'vf-layout-inner-container'
          }
        }" />
    </GroupElement>
    <GroupElement :class="css.group" name="results" :columns="6">
      <!-- Results -->
      <StaticElement name="results_title" content="Result" tag="h3" />
      <ObjectElement name="results">
        <!-- Winner -->
        <ToggleElement name="isWin" text="Defeat" :default="results.isWin" :labels="{ on: 'Win', off: 'Loss' }"
          @change="onWinChange" />
        <!-- Solved Mysteries -->
        <RadiogroupElement name="solvedMysteryCount" label="Number of solved mysteries"
          :default="results.solvedMysteryCount" :items="[0, 1, 2, 3, 4]" view="tabs" />
        <!-- Time -->
        <SliderElement name="time" label="Time" :default="results.time" type="number" :min="0" :max="toMs({ h: 24 })"
          :step="toMs({ m: 15 })" show-tooltip="always" :format="formatTime" />
        <!-- Comments -->
        <TextareaElement name="comment" label="Comment" placeholder="It was terrible..." :default="results.comment" />
        <!-- Reason for defeat -->
        <RadiogroupElement name="reason" label="Reason for defeat" :default="results.reason" :items="reasonNames"
          :conditions="[['results.isWin', false]]" view="blocks" />
        <!-- Scoring -->
        <ObjectElement name="scores" :conditions="[['results.isWin', true]]">
          <StaticElement name="scores_title" content="Scoring" tag="h4" />
          <TextElement v-for="(title, label) in SCORE" :key="label" :name="lower(label)" :label="title"
            :default="results.scores?.[lower(label)] ?? 0" input-type="number" rules="required|integer|min:0" />
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
</div>
</template>

<style module="css">
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
</style>: any: any: any: any: any: any
