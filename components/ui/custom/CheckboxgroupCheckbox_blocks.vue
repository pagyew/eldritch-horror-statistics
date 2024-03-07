<template><label :class="classes.container">
  <slot v-bind="{ name }" :classes="classes" :is-disabled="isDisabled" :id="id" :item="item" :value="value"
    :items="items" :index="index">
    <div :class="classes.wrapper">
      <input type="checkbox" v-model="el$.model" v-bind="attrs" :value="value" :class="classes.input" :name="name"
        :id="id" :disabled="isDisabled" />
      <div :class="classes.text_wrapper">
        <div :class="classes.text" v-html="item.label" />
        <div :class="classes.description" v-html="item.description" />
      </div>
      <div v-if="item.imageUrl" :class="classes.image_wrapper">
        <img :class="classes.image" :src="item.imageUrl" :alt="item.label" />
      </div>
    </div>
  </slot>
</label>
</template>

<script>
export default {
  name: 'CheckboxgroupCheckbox_tabs',
  data() {
    return {
      merge: true,
      defaultClasses: {
        container: 'vf-checkbox-blocks-container',
        container_sm: 'vf-checkbox-blocks-container-sm',
        container_md: '',
        container_lg: 'vf-checkbox-blocks-container-lg',
        wrapper: 'vf-checkbox-blocks',
        wrapper_not_last: 'vf-checkbox-blocks-not-last',
        wrapper_first: 'vf-checkbox-blocks-first',
        wrapper_first_sm: 'vf-checkbox-blocks-first-sm',
        wrapper_first_md: '',
        wrapper_first_lg: 'vf-checkbox-blocks-first-lg',
        wrapper_last: 'vf-checkbox-blocks-last',
        wrapper_last_sm: 'vf-checkbox-blocks-last-sm',
        wrapper_last_md: '',
        wrapper_last_lg: 'vf-checkbox-blocks-last-lg',
        wrapper_selected: 'vf-checkbox-blocks-selected',
        wrapper_unselected: 'vf-checkbox-blocks-unselected',
        wrapper_disabled: 'vf-checkbox-blocks-disabled',
        wrapper_sm: 'vf-checkbox-blocks-sm',
        wrapper_md: '',
        wrapper_lg: 'vf-checkbox-blocks-lg',
        input: 'vf-checkbox',
        input_enabled: '',
        input_disabled: '',
        input_sm: 'vf-checkbox-sm',
        input_md: '',
        input_lg: 'vf-checkbox-lg',
        text_wrapper: 'vf-checkbox-blocks-text-wrapper',
        text: 'vf-checkbox-blocks-text',
        description: 'vf-checkbox-blocks-description',
        description_sm: 'vf-checkbox-blocks-description-sm',
        description_md: '',
        description_lg: 'vf-checkbox-blocks-description-lg',
        image_wrapper: 'vf-checkbox-blocks-image-wrapper',
        image: 'vf-checkbox-blocks-image',
        image_sm: 'vf-checkbox-blocks-image-sm',
        image_md: '',
        image_lg: 'vf-checkbox-blocks-image-lg',
        $container: (classes, { Size }) => ([
          classes.container,
          classes[`container_${Size}`],
        ]),
        $wrapper: (classes, { index, items, el$, value, isDisabled, Size }) => ([
          classes.wrapper,
          classes[`wrapper_${Size}`],
          index < Object.keys(items).length - 1 ? classes.wrapper_not_last : null,
          index === 0 ? classes.wrapper_first : null,
          index === 0 ? classes[`wrapper_first_${Size}`] : null,
          index === Object.keys(items).length - 1 ? classes.wrapper_last : null,
          index === Object.keys(items).length - 1 ? classes[`wrapper_last_${Size}`] : null,
          el$.value.indexOf(value) !== -1 ? classes.wrapper_selected : classes.wrapper_unselected,
          isDisabled ? classes.wrapper_disabled : null,
        ]),
        $input: (classes, { isDisabled, Size }) => ([
          classes.input,
          classes[`input_${Size}`],
          isDisabled ? classes.input_disabled : classes.input_enabled,
        ]),
        $description: (classes, { Size }) => ([
          classes.description,
          classes[`description_${Size}`],
        ]),
        $image: (classes, { Size }) => ([
          classes.image,
          classes[`image_${Size}`],
        ])
      }
    }
  }
}
</script>

<style lang="scss">
.vf-checkbox-blocks-image-wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

.vf-checkbox-blocks-image-sm {
  width: 1.5rem;
  height: 1.5rem;
}

.vf-checkbox-blocks-image {
  width: 2rem;
  height: 2rem;
}

.vf-checkbox-blocks-image-lg {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
