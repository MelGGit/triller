<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import LandingNavbarVue from '@/components/navbars/landingNavbar.vue';

const { width, height } = useWindowSize()
</script>
<template>
  <div class="flex flex-col flex-grow bg-zinc-900 text-stone-100"
    :style="{ 'max-width': width + 'px', 'max-height': height + 'px' }">
    <header>
      <LandingNavbarVue />
    </header>
    <main class="flex-grow py-40 xl:px-40 lg:px-20">
      <router-view />
    </main>
  </div>
</template>