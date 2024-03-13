<script setup lang="ts">
const props = defineProps<{ investigators: IGameInvestigator[] }>()
const { investigators } = toRefs(props)

const emits = defineEmits<{ change: [investigators: IGameInvestigator[]] }>()

const investigatorCards = computed(() => mergeBy(
  INVESTIGATORS,
  investigators.value.map(elem => extend(elem, 'selected', true)),
  'name'
))

function change(investigator: IGameInvestigator) {
  const newInvestigators = mergeBy(
    investigators.value,
    [investigator],
    'name'
  )

  emits('change', newInvestigators)
}

function remove(name: InvestigatorName) {
  emits('change', investigators.value.filter(investigator => investigator.name !== name))
}
</script>

<template>
<div class="container">
  <div class="form">
    <h2>Select investigators</h2>
    <div class="cards">
      <UiInvestigator v-for="investigator of investigatorCards" :key="investigator.name" v-bind="investigator"
        @select="change" @remove="remove" />
    </div>
  </div>

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

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
