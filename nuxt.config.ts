// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },

  typescript: {
    shim: false
  },

  app: {
    rootId: 'app'
  },

  routeRules: {
    '/': { prerender: true },
    '/api/*': { cors: true }
  },

  experimental: {
    appManifest: false
  },

  modules: ['@pinia/nuxt', "@vueform/nuxt"]
})
