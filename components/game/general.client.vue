<script setup lang="ts">
const props = defineProps<{
  expansionNames: ExpansionName[]
  general: IGameGeneral
}>()
const { expansionNames, general } = toRefs(props)

const emits = defineEmits<{
  submit: [type: 'general', general: IGameGeneral]
  cancel: []
}>()

const filteredAncients = computed(() =>
  getNames(ANCIENTS.filter(ancient => expansionNames.value.includes(ancient.expansion)))
)

function onSubmit(form$: Vueform) {
  emits('submit', 'general', form$.requestData as IGameGeneral)
}

function onCancel() {
  emits('cancel')
}
</script>

<template>
<div :class="css.container">
  <Vueform :class="css.form" :endpoint="false" @submit="onSubmit">
    <StaticElement name="head" tag="h2" content="Edit general info" />
    <!-- Date -->
    <DateElement name="date" label="Date" :default="general.date" display-format="MMMM DD, YYYY" />
    <!-- AncientName -->
    <SelectElement name="ancientName" label="Ancient One" :default="general.ancientName" :items="filteredAncients" />
    <!-- PlayerCount -->
    <SelectElement name="playerCount" label="Number of players" :default="general.playerCount" :items="arr(8)" />
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
