// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      GPT_API_KEY: process.env.GPT_API_KEY || "",
      GPT_API_URL: process.env.GPT_API_URL || "",
      URL: process.env.URL || "",
    },
  },
  devtools: { enabled: true }
})
