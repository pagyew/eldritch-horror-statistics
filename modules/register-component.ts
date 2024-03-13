import { addComponent, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    addComponent({
      name: 'Clickout',
      export: 'OnClickOutside',
      filePath: '@vueuse/components',
    })
  },
})
