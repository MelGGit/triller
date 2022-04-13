import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import '@/styles/index.css'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const head = createHead()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(head)

app.mount('#app')
