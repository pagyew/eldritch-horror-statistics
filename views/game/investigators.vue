<script lang="ts" setup>
const props = withDefaults(defineProps<{
  investigators: IGameInvestigator[]
}>(), {
  investigators: () => []
})
const { investigators } = toRefs(props)

const emits = defineEmits<{
  editClick: [type: 'investigators']
}>()
</script>

<template>
<ViewGameBlock type="investigators" @edit-click="emits('editClick', 'investigators')">
  <ul>
    <li v-for="{ name, team, isOut } in investigators" :key="name">
      {{ name }}
      <ul>
        <li>Team: {{ team }}</li>
        <li>is Out: {{ isOut }}</li>
      </ul>
    </li>
  </ul>
</ViewGameBlock>
</template>

<style module="css"></style>
