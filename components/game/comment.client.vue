<script setup lang="ts">
const props = defineProps<{
  comment?: string
}>()
const { comment } = toRefs(props)

const emits = defineEmits<{
  submit: [type: 'comment', comment: string]
  close: []
}>()

function onSubmit(form$: Vueform) {
  const { comment } = form$.requestData as { comment: string }
  emits('submit', 'comment', comment)
}

function onCancel() {
  emits('close')
}
</script>

<template>
<div :class="css.container">
  <Vueform :class="css.form" :endpoint="false" @submit="onSubmit">
    <StaticElement name="head" tag="h2" content="Edit comment" />
    <!-- Comments -->
    <TextareaElement name="comment" label="Comment" placeholder="It was terrible..." :default="comment" />
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
