<script lang="ts" setup>
const languages = Object.values(LANGUAGE)

const props = withDefaults(defineProps<{
  selected: LanguageName
}>(), {
  selected: LANGUAGE.ENGLISH,
})

const emits = defineEmits<{
  select: [language: LanguageName]
}>()

function change(language: LanguageName) {
  emits('select', language)
}
</script>

<template>
<Vueform v-bind="$attrs">
  <StaticElement name="title" tag="h4" content="Language" align="center" />
  <SelectElement name="language" :default="props.selected" :items="languages" @change="change" />
</Vueform>
</template>

<style module></style>
