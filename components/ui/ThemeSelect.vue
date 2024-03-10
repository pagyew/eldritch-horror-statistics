<script lang="ts" setup>
const themes = Object.values(THEME)

const emits = defineEmits<{
  select: [theme: ThemeName]
}>()

function change(theme: ThemeName) {
  emits('select', theme)
}
</script>

<template>
<ClientOnly>
  <Vueform v-bind="$attrs">
    <StaticElement name="title" tag="h4" content="Theme" align="center" />
    <SelectElement name="theme" :default="THEME.SYSTEM" :items="themes" @change="change" />
  </Vueform>
</ClientOnly>
</template>

<style scoped></style>
