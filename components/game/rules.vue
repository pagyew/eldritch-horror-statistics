<script setup lang="ts">
const preludeNames = [{ label: 'None', value: null }, ...Object.values(PRELUDE)]
const mythos = ['easy', 'normal', 'hard']

const props = defineProps({
  game: {
    type: Object as PropType<IGameRulesProps>,
    required: true
  }
})
const { id, rules } = props.game

const emits = defineEmits<{
  submit: [game: IGameRulesProps]
  cancel: []
}>()

function submit(form$: Vueform) {
  emits('submit', form$.requestData as IGameRulesProps)
}

function cancel() {
  emits('cancel')
}
</script>

<template>
<div class="container">
  <ClientOnly>
    <Vueform class="form" :endpoint="false" @submit="submit">
      <StaticElement name="head" tag="h2" content="Edit rules" />
      <!-- ID -->
      <HiddenElement name="id" :default="id" />
      <!-- Rules -->
      <ObjectElement name="rules">
        <!-- Prelude -->
        <SelectElement name="prelude" label="Prelude" :default="rules?.preludeName" :items="preludeNames" />
        <!-- Starting Rumor -->
        <ToggleElement name="startingRumor" label="Starting rumor" :default="rules?.startingRumor" />
        <!-- Mythos -->
        <CheckboxgroupElement name="mythos" label="Mythos" :default="rules?.mythos" :items="mythos" view="blocks" />
      </ObjectElement>
      <!-- Submit buttons -->
      <GroupElement class="buttons" name="buttons">
        <ButtonElement name="cancel" button-label="Cancel" secondary @click="cancel" :columns="6" />
        <ButtonElement name="submit" button-label="Save" align="right" submits :columns="6" />
      </GroupElement>
    </Vueform>
  </ClientOnly>
</div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.form {
  padding: 20px;
  border: 1px solid #ccc;
}

.buttons {
  margin-top: 20px;
}
</style>
