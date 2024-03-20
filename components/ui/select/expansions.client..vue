<script lang="ts" setup>
const props = withDefaults(defineProps<{
  selected: ExpansionName[]
}>(), {
  selected: () => []
})

const emits = defineEmits<{
  select: [expansions: ExpansionName[]]
}>()

const expansions = sortBy(EXPANSIONS, { key: 'releaseYear' })
  .map(pick(['name:value', 'name:label', 'ancinets', 'logoUrl:imageUrl']))
  .map(expansion => ({ ...expansion, description: join(expansion.ancinets) }))

function change(items: ExpansionName[]) {
  emits('select', items)
}
</script>

<template>
<Vueform v-bind="$attrs">
  <StaticElement name="title" tag="h4" content="Select expansions" align="center" />
  <CheckboxgroupElement name="expansions" :default="[EXPANSION.CORE, ...props.selected]" :disables="[EXPANSION.CORE]"
    :items="expansions" @change="change" view="blocks" />
</Vueform>
</template>

<style module></style>
