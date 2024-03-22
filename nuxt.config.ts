// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  components: [
    { path: '~/views', prefix: 'View', extensions: ['vue'] },
    '~/components'
  ],

  typescript: { shim: false },

  app: { rootId: 'app' },

  routeRules: {
    '/': { prerender: true },
    '/api/*': { cors: true }
  },

  experimental: { appManifest: false },

  imports: {
    dirs: ['constants'],
    presets: [{
      from: 'pinia',
      imports: ['skipHydrate']
    }, {
      from: '@vueform/vueform',
      imports: ['Vueform'],
      type: true,
    }],
  },

  nitro: {
    imports: {
      dirs: ['constants', 'server/mocks', 'stores']
    }
  },

  modules: ['@pinia/nuxt', "@vueform/nuxt", "@vueuse/nuxt"]
})
