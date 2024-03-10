<script lang="ts" setup>
const languages = Object.values(LANGUAGE)

const props = defineProps({
  selected: {
    type: String as PropType<LanguageName>,
    default: LANGUAGE.ENGLISH,
  }
})

const emits = defineEmits<{
  select: [language: LanguageName]
}>()

function change(language: LanguageName) {
  emits('select', language)
}
</script>

<template>
<ClientOnly>
  <Vueform v-bind="$attrs">
    <StaticElement name="title" tag="h4" content="Language" align="center" />
    <SelectElement name="language" :default="props.selected" :items="languages" @change="change" />
  </Vueform>
</ClientOnly>
</template>

<style scoped></style>
