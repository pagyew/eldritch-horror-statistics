<script setup lang="ts">
const ancientNames = Object.values(ANCIENT)

const props = defineProps({
  game: {
    type: Object as PropType<IGameGeneral>,
    required: true
  }
})
const { id, date, ancientName, playerCount } = props.game

const emits = defineEmits<{
  submit: [game: IGameGeneral]
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
<div class="container">
  <ClientOnly>
    <Vueform class="form" :endpoint="false" @submit="submit">
      <StaticElement name="head" tag="h2" content="Edit general info" />
      <!-- ID -->
      <HiddenElement name="id" :default="id" />
      <!-- Date -->
      <DateElement name="date" label="Date" :default="date" display-format="MMMM DD, YYYY" />
      <!-- AncientName -->
      <SelectElement name="ancientName" label="Ancient One" :default="ancientName" :items="ancientNames" />
      <!-- PlayerCount -->
      <SelectElement name="playerCount" label="Number of players" :default="playerCount"
        :items="arr(8, { start: 1 })" />
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
