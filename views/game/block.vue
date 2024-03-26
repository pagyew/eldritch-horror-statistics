<script lang="ts" setup>
const props = defineProps<{
  type: IGameBlock
}>()
const { type } = toRefs(props)

const emits = defineEmits<{
  editClick: []
}>()
</script>

<template>
<div :class="css.block">
  <button :class="css.button" @click="emits('editClick')">Edit</button>
  <h3>{{ f_upper(type) }}</h3>
  <slot />
</div>
</template>

<style module="css">
.block {
  border: 1px solid #ccc;
  padding: 10px;
  position: relative;
}

.button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
