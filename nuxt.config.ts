// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  typescript: { shim: false },

  app: { rootId: 'app' },

  routeRules: {
    '/': { prerender: true },
    '/api/*': { cors: true }
  },

  experimental: { appManifest: false },

  imports: {
    dirs: ['constants']
  },

  nitro: {
    imports: {
      dirs: ['constants', 'server/mocks']
    }
  },

  modules: ['@pinia/nuxt', "@vueform/nuxt", "@vueuse/nuxt"]
})
