<script lang="ts" setup>
const css = useCssModule('css')
const visible = ref(true)

const props = withDefaults(defineProps<{
  name: InvestigatorName
  specialization: string
  imageUrl: string
  team?: InvestigatorTeam
  isOut?: boolean
  selected?: boolean
}>(), {
  team: 'initial',
  isOut: false,
  selected: false,
})
const { name, specialization, imageUrl, team, isOut, selected } = toRefs(props)

const emits = defineEmits<{
  select: [investigator: IGameInvestigator],
  remove: [name: InvestigatorName]
}>()

function select(form$: Vueform) {
  emits('select', { name: name.value, ...form$.requestData } as IGameInvestigator)
  toggleVisible()
}

function remove() {
  emits('remove', name.value)
  toggleVisible()
}

function toggleVisible() {
  visible.value = !visible.value
}

function clickout() {
  visible.value = true
}

const cardStyles = computed(() => ({
  [css.card]: true,
  [css.card_flipped]: visible.value,
  [css.card_selected]: selected.value
}))
</script>

<template>
<div :class="cardStyles">
  <div v-if="visible" :class="[css.face, css.front]" @click="toggleVisible">
    <img :class="css.image" :src="imageUrl" alt="name">
    <div :class="css.name">{{ name }}</div>
    <div :class="css.specialization">{{ specialization }}</div>
  </div>
  <Clickout v-else :class="[css.face, css.back]" @trigger="clickout">
    <Vueform :class="css.form" :endpoint="false" @submit="select">
      <RadiogroupElement name="team" label="Team" :default="team" :items="INVESTIGATOR_TEAMS" />
      <ToggleElement name="isOut" text="Out of Game" :default="isOut" />
      <GroupElement class="buttons" name="buttons">
        <ButtonElement name="remove" button-label="Delete" secondary full @click="remove" />
        <ButtonElement name="submit" button-label="Save" submits full />
      </GroupElement>
    </Vueform>
  </Clickout>
</div>
</template>

<style module="css">
.card {
  box-sizing: border-box;
  width: 180px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  transition: 0.5s transform ease-in-out;
  transform-style: preserve-3d;
}

.card_flipped {
  transform: rotateY(180deg);
}

.card_selected {
  border-color: limegreen;
  border-width: 4px;
}

.face {
  position: absolute;
  display: flex;
  padding: 12px 8px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backface-visibility: hidden;
}

.front {
  cursor: pointer;
  transform: rotateY(180deg);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.back {
  background-color: aliceblue;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.image {
  width: 100px;
  height: 100px;
}

.name {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
}

.specialization {
  font-size: 12px;
  text-align: center;
  margin-top: 4px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
