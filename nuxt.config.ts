// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    soccerApiKey: process.env.SOCCER_API_KEY,
    soccerApiUrl: process.env.SOCCER_API_URL,
    jsonPlaceUrl: process.env.NUXT_TEST_URL,
  },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/modern-css-reset/dist/reset.min.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap' }
      ]
    }
  },
  css: ["@/assets/styles/_utility.scss", "@/assets/styles/_template.scss"]
})
