<script lang="ts" setup>
const props = withDefaults(defineProps<{
  selected: ExpansionName[]
}>(), {
  selected: () => []
})

const emits = defineEmits<{
  select: [expansions: ExpansionName[]]
}>()

function change(expansions: ExpansionName[]) {
  console.log('change', expansions.toString())
  emits('select', expansions)
}
</script>

<template>
<Vueform :class="css.form" v-bind="$attrs">
  <StaticElement name="title" tag="h4" content="Select expansions" align="center" />
  <CheckboxgroupElement name="expansions" :default="props.selected" :disables="[EXPANSION.CORE]"
    :items="EXPANSION_CARDS" @change="change" view="blocks" />
</Vueform>
</template>

<style module="css">
.form {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
