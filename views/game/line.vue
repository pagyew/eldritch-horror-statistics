<script lang="ts" setup>
const props = defineProps<{
  left: string | number | boolean
  right: string | number | boolean
}>()
const { left, right } = toRefs(props)
</script>

<template>
<div :class="css.line">
  <span>{{ left }}</span>
  <span>{{ right }}</span>
</div>
</template>

<style module="css">
.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
