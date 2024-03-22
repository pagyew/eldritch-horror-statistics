<script lang="ts" setup>
const props = withDefaults(defineProps<{
  selected: ExpansionName[]
}>(), {
  selected: () => []
})

const emits = defineEmits<{
  select: [expansions: ExpansionName[]]
}>()

function change(items: ExpansionName[]) {
  emits('select', items)
}
</script>

<template>
<Vueform v-bind="$attrs">
  <StaticElement name="title" tag="h4" content="Select expansions" align="center" />
  <CheckboxgroupElement name="expansions" :default="[EXPANSION.CORE, ...props.selected]" :disables="[EXPANSION.CORE]"
    :items="EXPANSION_CARDS" @change="change" view="blocks" />
</Vueform>
</template>

<style module></style>
