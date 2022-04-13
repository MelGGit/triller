<script setup lang='ts'>
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
</script>

<template>
  <main class="flex-grow"
    :style="{ 'max-width': width + 'px', 'max-height': height + 'px' }">
    <router-view />
  </main>
</template>