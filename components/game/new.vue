<script setup lang="ts">
const ancientNames = Object.values(ANCIENT)
const id = crypto.randomUUID()

const emits = defineEmits<{
  submit: [game: IGameNew]
  cancel: []
}>()

function submit(form$: Vueform) {
  emits('submit', form$.requestData as IGameNew)
}

function cancel() {
  emits('cancel')
}
</script>

<template>
<div :class="css.container">
  <ClientOnly>
    <Vueform :class="css.form" :endpoint="false" @submit="submit">
      <StaticElement name="head" tag="h2" content="Create a new game" />
      <!-- ID -->
      <HiddenElement name="id" :default="id" />
      <!-- Date -->
      <DateElement name="date" label="Date" :default="new Date()" display-format="MMMM DD, YYYY" />
      <!-- AncientName -->
      <SelectElement name="ancientName" label="Ancient One" :default="ANCIENT.AZATHOTH" :items="ancientNames" />
      <!-- PlayerCount -->
      <SelectElement name="playerCount" label="Number of players" :default="4" :items="arr(8, { start: 1 })" />
      <!-- isWin ? -->
      <ToggleElement name="isWin" label="Result" :default="false" :labels="{ on: 'Win', off: 'Loss' }" />
      <!-- Submit buttons -->
      <GroupElement :class="css.buttons" name="buttons">
        <ButtonElement name="cancel" button-label="Cancel" secondary @click="cancel" :columns="6" />
        <ButtonElement name="submit" button-label="Create game" align="right" submits :columns="6" />
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
