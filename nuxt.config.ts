// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  app: {
    rootId: 'app'
  },

  routeRules: {
    '/api/**': { cors: true }
  },

  experimental: {
    appManifest: false
  },

  modules: ['@pinia/nuxt', "@vueuse/nuxt"]
})
