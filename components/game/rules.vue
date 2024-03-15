<script setup lang="ts">
const preludeNames = Object.values(PRELUDE)
const allMythos: IGameMythos[] = ['easy', 'normal', 'hard']

const props = withDefaults(defineProps<{
  preludeName?: PreludeName
  hasStartingRumor?: boolean
  mythos?: IGameMythos[]
}>(), {
  preludeName: 'None',
  hasStartingRumor: false,
  mythos: () => [...allMythos]
})
const { preludeName, hasStartingRumor, mythos } = toRefs(props)

const emits = defineEmits<{
  submit: [rules: IGameRules]
  cancel: []
}>()

function submit(form$: Vueform) {
  emits('submit', form$.requestData as IGameRules)
}

function cancel() {
  emits('cancel')
}
</script>

<template>
<div :class="css.container">
  <ClientOnly>
    <Vueform :class="css.form" :endpoint="false" @submit="submit">
      <StaticElement name="head" tag="h2" content="Edit rules" />
      <!-- Prelude -->
      <SelectElement name="prelude" label="Prelude" :default="preludeName" :items="preludeNames" />
      <!-- Starting Rumor -->
      <ToggleElement name="startingRumor" label="Starting rumor" :default="hasStartingRumor" />
      <!-- Mythos -->
      <CheckboxgroupElement name="mythos" label="Mythos" :default="mythos" :items="allMythos" view="blocks" />
      <!-- Submit buttons -->
      <GroupElement :class="css.buttons" name="buttons">
        <ButtonElement name="cancel" button-label="Cancel" secondary @click="cancel" :columns="6" />
        <ButtonElement name="submit" button-label="Save" align="right" submits :columns="6" />
      </GroupElement>
    </Vueform>
  </ClientOnly>
</div>
</template>

<style module="css">
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
