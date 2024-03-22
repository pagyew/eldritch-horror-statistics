<script setup lang="ts">
const props = defineProps<{
  date: string
  ancientName: AncientName
  playerCount: number
}>()
const { date, ancientName, playerCount } = toRefs(props)

const emits = defineEmits<{
  submit: [general: IGameGeneral]
  cancel: []
}>()

function submit(form$: Vueform) {
  emits('submit', form$.requestData as IGameGeneral)
}

function cancel() {
  emits('cancel')
}
</script>

<template>
<div :class="css.container">
  <Vueform :class="css.form" :endpoint="false" @submit="submit">
    <StaticElement name="head" tag="h2" content="Edit general info" />
    <!-- Date -->
    <DateElement name="date" label="Date" :default="date" display-format="MMMM DD, YYYY" />
    <!-- AncientName -->
    <SelectElement name="ancientName" label="Ancient One" :default="ancientName" :items="ANCIENT_NAMES" />
    <!-- PlayerCount -->
    <SelectElement name="playerCount" label="Number of players" :default="playerCount" :items="arr(8)" />
    <!-- Submit buttons -->
    <GroupElement :class="css.buttons" name="buttons">
      <ButtonElement name="cancel" button-label="Cancel" secondary @click="cancel" :columns="6" />
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
