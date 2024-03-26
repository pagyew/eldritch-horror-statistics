<script lang="ts" setup>
const props = defineProps<{
  date: string
  ancientName: AncientName
  playerCount: number
}>()
const { date, ancientName, playerCount } = toRefs(props)

const emits = defineEmits<{
  editClick: [type: 'general']
}>()
</script>

<template>
<ViewGameBlock type="general" @edit-click="emits('editClick', 'general')">
  <ViewGameLine left="Ancient" :right="ancientName" />
  <ViewGameLine left="Players" :right="playerCount" />
  <ViewGameLine left="Date" :right="date" />
</ViewGameBlock>
</template>

<style module="css"></style>
