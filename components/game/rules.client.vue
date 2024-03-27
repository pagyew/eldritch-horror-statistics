<script setup lang="ts">
const props = withDefaults(defineProps<{
  expansionNames: ExpansionName[]
  rules?: IGameRules
}>(), {
  rules: () => ({
    preludeName: PRELUDE.NONE,
    hasStartingRumor: false,
    mythos: [...MYTH_TYPES]
  })
})
const { expansionNames, rules } = toRefs(props)

const emits = defineEmits<{
  submit: [type: 'rules', rules: IGameRules]
  cancel: []
}>()

const filteredPreludeNames = computed(() =>
  getNames(PRELUDES.filter(prelude => expansionNames.value.includes(prelude.expansion)))
)

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
    <SelectElement name="preludeName" label="Prelude" :default="rules.preludeName" :items="filteredPreludeNames" />
    <!-- Starting Rumor -->
    <ToggleElement name="hasStartingRumor" label="Starting rumor" :default="rules.hasStartingRumor" />
    <!-- Mythos -->
    <CheckboxgroupElement name="mythos" label="Mythos" :default="rules.mythos" :items="MYTH_TYPES" view="blocks" />
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
