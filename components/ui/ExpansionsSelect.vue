<script lang="ts" setup>
const props = defineProps({
  selected: {
    type: Array as PropType<ExpansionName[]>,
    default: () => [],
  }
})
const emits = defineEmits<{
  select: [expansions: ExpansionName[]]
}>()

const expansions = EXPANSIONS
  .sort((a, b) => a.releaseYear - b.releaseYear)
  .map(({ name, ancinets, logoUrl }) => ({
    value: name,
    label: name,
    description: join(ancinets),
    imageUrl: logoUrl
  }))

function change(items: ExpansionName[]) {
  emits('select', items)
}
</script>

<template>
<ClientOnly>
  <Vueform class="form" @change="change">
    <StaticElement name="title" tag="h3" content="Select expansions" align="center" />
    <CheckboxgroupElement name="expansions" :default="[EXPANSION.CORE, ...props.selected]" :disables="[EXPANSION.CORE]"
      :items="expansions" view="blocks" />
  </Vueform>
</ClientOnly>
</template>

<style scoped>
.form {
  width: max-content;
}
</style>
