<script lang="ts" setup>
const props = withDefaults(defineProps<{
  isWin: boolean
  solvedMysteryCount?: number
  time?: number
  scores?: IScores
  reason?: ReasonName
}>(), {
  solvedMysteryCount: 1,
  time: toMs({ h: 4 }),
  reason: REASON.SURRENDER
})
const { isWin, solvedMysteryCount, time, scores, reason } = toRefs(props)

const emits = defineEmits<{
  editClick: [type: 'results']
}>()
</script>

<template>
<ViewGameBlock type="results" @edit-click="emits('editClick', 'results')">
  <p>Winner: {{ isWin }}</p>
  <p>Time: {{ formatTime(time ?? 0) }}</p>
  <p>Solved mysteries: {{ solvedMysteryCount }}</p>
  <div v-if="isWin">
    <p v-if="scores">Score: {{ calculateScore(scores) }}</p>
    <ViewGameLine v-for="(score, name) in scores" :key="name" :left="SCORE[upper(name)]" :right="score" />
  </div>
  <div v-else>{{ reason }}</div>
</ViewGameBlock>
</template>

<style module="css"></style>
