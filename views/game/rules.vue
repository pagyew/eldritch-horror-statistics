<script lang="ts" setup>
const props = withDefaults(defineProps<{
  preludeName?: PreludeName
  hasStartingRumor?: boolean
  mythos?: IGameMythos[]
}>(), {
  preludeName: PRELUDE.NONE,
  hasStartingRumor: false,
  mythos: () => [...MYTH_TYPES]
})
const { preludeName, hasStartingRumor, mythos } = toRefs(props)

const emits = defineEmits<{
  editClick: [type: 'rules']
}>()
</script>

<template>
<ViewGameBlock type="rules" @edit-click="emits('editClick', 'rules')">
  <ViewGameLine left="Mythos" :right="join(mythos)" />
  <ViewGameLine left="Prelude" :right="preludeName" />
  <ViewGameLine left="Rumor" :right="hasStartingRumor" />
</ViewGameBlock>
</template>

<style module="css"></style>
