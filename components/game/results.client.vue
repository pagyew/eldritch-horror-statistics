<script lang="ts" setup>
import type { RadiogroupElement } from '@vueform/vueform'

let mysteryEl$: Nullable<RadiogroupElement> = null

const props = withDefaults(defineProps<{
  results: IGameResults
}>(), {
  results: () => ({
    isWin: false,
    solvedMysteryCount: 1,
    time: toMs({ h: 4 }),
    reason: REASON.SURRENDER
  }),
})
const { results } = toRefs(props)

const emits = defineEmits<{
  submit: [type: 'results', results: IGameResults]
  cancel: []
}>()

function onSubmit(form$: Vueform) {
  emits('submit', 'results', form$.requestData as IGameResults)
}

function onCancel() {
  emits('cancel')
}

function onFormMounted(form$: Vueform) {
  mysteryEl$ = form$.el$('solvedMysteryCount') as unknown as RadiogroupElement

  if (!mysteryEl$?.data) {
    mysteryEl$?.update(results.value.isWin ? 3 : 1)
  }
}

function onWinChange(newValue: boolean) {
  if (newValue) {
    if (mysteryEl$?.value < 3) mysteryEl$?.update(3)
    mysteryEl$?.disable([0, 1, 2])
  } else {
    if (mysteryEl$?.value > 2) mysteryEl$?.update(1)
    mysteryEl$?.enableAll()
  }
}
</script>

<template>
<div :class="css.container">
  <Vueform :class="css.form" :endpoint="false" @submit="onSubmit" @mounted="onFormMounted">
    <StaticElement name="head" tag="h2" content="Edit results" />
    <!-- IsWin -->
    <ToggleElement name="isWin" text="Defeat" :default="results.isWin" :labels="{ on: 'Win', off: 'Loss' }"
      @change="onWinChange" />
    <!-- Solved Mysteries -->
    <RadiogroupElement name="solvedMysteryCount" label="Number of solved mysteries"
      :default="results.solvedMysteryCount" :items="arr(5, { start: 0 })" view="tabs" />
    <!-- Time -->
    <SliderElement name="time" label="Time" :default="results.time" type="number" :min="0" :max="toMs({ h: 24 })"
      :step="toMs({ m: 15 })" show-tooltip="always" :format="formatTime" />
    <!-- Reason for defeat -->
    <RadiogroupElement name="reason" label="Reason for defeat" :default="results.reason" :items="REASON_NAMES"
      :conditions="[['isWin', false]]" view="blocks" />
    <!-- Scoring -->
    <ObjectElement name="scores" :conditions="[['isWin', true]]">
      <StaticElement name="scores_title" content="Scoring" tag="h4" />
      <TextElement v-for="(title, label) in SCORE" :key="label" :name="lower(label)" :label="title"
        :default="results.scores?.[lower(label)] ?? 0" input-type="number" rules="required|integer|min:0" />
    </ObjectElement>
    <!-- Submit buttons -->
    <GroupElement :class="css.buttons" name="buttons">
      <ButtonElement name="cancel" button-label="Cancel" secondary @click="onCancel" :columns="6" />
      <ButtonElement name="submit" button-label="Save" align="right" submits :columns="6" />
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
  padding: 20px;
  border: 1px solid #ccc;
}

.buttons {
  margin-top: 20px;
}
</style>
