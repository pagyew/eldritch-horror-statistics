<script setup lang="ts">
const props = defineProps<{
  comment?: string
}>()
const { comment } = toRefs(props)

const emits = defineEmits<{
  editClick: [type: 'comment']
}>()
</script>

<template>
<ViewGameBlock type="comment" @edit-click="emits('editClick', 'comment')">
  <samp>{{ comment }}</samp>
</ViewGameBlock>
</template>

<style module="css"></style>
