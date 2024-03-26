<script setup lang="ts">
const props = withDefaults(defineProps<{
  investigators: IGameInvestigator[]
}>(), {
  investigators: () => []
})
const { investigators } = toRefs(props)

const emits = defineEmits<{
  change: [type: 'investigators', investigators: IGameInvestigator[]]
  close: []
}>()

const investigatorCards = computed(() => mergeBy(
  INVESTIGATORS,
  investigators.value.map(extend('selected', true)),
  'name'
))

function change(investigator: IGameInvestigator) {
  const newInvestigators = mergeBy(
    investigators.value,
    [investigator],
    'name'
  )

  emits('change', 'investigators', newInvestigators)
}

function remove(name: InvestigatorName) {
  emits('change', 'investigators', investigators.value.filter(investigator => investigator.name !== name))
}
</script>

<template>
<div :class="css.container">
  <div :class="css.form">
    <h2>Select investigators</h2>
    <button @click="emits('close')">Close</button>
    <div :class="css.cards">
      <UiInvestigator v-for="investigator of investigatorCards" :key="investigator.name" v-bind="investigator"
        @select="change" @remove="remove" />
    </div>
  </div>

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

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
