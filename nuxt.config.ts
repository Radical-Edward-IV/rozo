// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  
  app: {
    baseURL: '/rozo/',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://hangeul.pstatic.net/hangeul_static/css/nanum-gothic.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://hangeul.pstatic.net/hangeul_static/css/nanum-gothic-coding.css'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  ssr: false
})
