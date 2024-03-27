<script setup lang="ts">
const id = crypto.randomUUID()

const props = defineProps<{
  expansions: ExpansionName[]
}>()
const { expansions } = toRefs(props)

const emits = defineEmits<{
  submit: [game: IGameNew]
  cancel: []
}>()

const filteredAncients = computed(() => {
  return EXPANSIONS
    .filter(expansion => expansions.value.includes(expansion.name))
    .flatMap(expansion => expansion.ancinets)
    .sort()
})

function onSubmit(form$: Vueform) {
  emits('submit', form$.requestData as IGameNew)
}

function onCancel() {
  emits('cancel')
}
</script>

<template>
<div :class="css.container">
  <Vueform :class="css.form" :endpoint="false" @submit="onSubmit">
    <StaticElement name="head" tag="h2" content="Create a new game" />
    <!-- ID -->
    <HiddenElement name="id" :default="id" />
    <ObjectElement name="general">
      <!-- Date -->
      <DateElement name="date" label="Date" :default="new Date()" display-format="MMMM DD, YYYY" />
      <!-- AncientName -->
      <SelectElement name="ancientName" label="Ancient One" :default="ANCIENT.AZATHOTH" :items="filteredAncients" />
      <!-- PlayerCount -->
      <SelectElement name="playerCount" label="Number of players" :default="4" :items="arr(8)" />
    </ObjectElement>
    <ObjectElement name="results">
      <!-- IsWin -->
      <ToggleElement name="isWin" label="Defeat" :default="false" :labels="{ on: 'Win', off: 'Loss' }" />
    </ObjectElement>
    <!-- Comments -->
    <TextareaElement name="comment" label="Comment" placeholder="It was terrible..." />
    <!-- Submit buttons -->
    <GroupElement :class="css.buttons" name="buttons">
      <ButtonElement name="cancel" button-label="Cancel" secondary @click="onCancel" :columns="6" />
      <ButtonElement name="submit" button-label="Create game" align="right" submits :columns="6" />
    </GroupElement>
  </Vueform>
</div>
</template>

<style module="css">
.container {
  display: flex;
  justify-content: center;
}

.form {
  padding: 20px;
  border: 1px solid #ccc;
}

.buttons {
  margin-top: 20px;
}
</style>
