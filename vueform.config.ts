import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

import CheckboxgroupCheckbox_blocks from '~/components/ui/custom/CheckboxgroupCheckbox_blocks.vue'

import '@vueform/vueform/dist/vueform.css';

export default defineConfig({
  classHelpers: true,
  displayErrors: false,
  floatPlaceholders: false,
  theme: vueform,
  locales: { en },
  locale: 'en',
  templates: { CheckboxgroupCheckbox_blocks },
  forceNumbers: true
})
