import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
  plugins: [
    Vue(),
    Pages(),
    Layouts()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@vueuse/head',
      '@vueuse/components'
    ],
  },
})
