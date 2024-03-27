<script setup lang="ts">
const props = withDefaults(defineProps<{
  preludeName?: PreludeName
  hasStartingRumor?: boolean
  mythos?: IGameMythos[]
}>(), {
  preludeName: 'None',
  hasStartingRumor: false,
  mythos: () => [...MYTH_TYPES]
})
const { preludeName, hasStartingRumor, mythos } = toRefs(props)

const emits = defineEmits<{
  submit: [type: 'rules', rules: IGameRules]
  cancel: []
}>()

function onSubmit(form$: Vueform) {
  emits('submit', 'rules', form$.requestData as IGameRules)
}

function onCancel() {
  emits('cancel')
}
</script>

<template>
<div :class="css.container">
  <Vueform :class="css.form" :endpoint="false" @submit="onSubmit">
    <StaticElement name="head" tag="h2" content="Edit rules" />
    <!-- Prelude -->
    <SelectElement name="preludeName" label="Prelude" :default="preludeName" :items="PRELUDE_NAMES" />
    <!-- Starting Rumor -->
    <ToggleElement name="hasStartingRumor" label="Starting rumor" :default="hasStartingRumor" />
    <!-- Mythos -->
    <CheckboxgroupElement name="mythos" label="Mythos" :default="mythos" :items="MYTH_TYPES" view="blocks" />
    <!-- Submit buttons -->
    <GroupElement :class="css.buttons" name="buttons">
      <ButtonElement name="cancel" button-label="Cancel" secondary @click="onCancel" :columns="6" />
      <ButtonElement name="submit" button-label="Save" align="right" submits :columns="6" />
    </GroupElement>
  </Vueform>
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
