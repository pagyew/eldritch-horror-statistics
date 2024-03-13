<script lang="ts" setup>
const themes = Object.values(THEME)

const props = withDefaults(defineProps<{
  selected: ThemeName
}>(), {
  selected: THEME.SYSTEM
})

const emits = defineEmits<{
  select: [theme: ThemeName]
}>()

function change(theme: ThemeName) {
  emits('select', theme)
}
</script>

<template>
<Vueform v-bind="$attrs">
  <StaticElement name="title" tag="h4" content="Theme" align="center" />
  <SelectElement name="theme" :default="props.selected" :items="themes" @change="change" />
</Vueform>
</template>

<style scoped></style>
