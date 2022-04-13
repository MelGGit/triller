<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Triller | Decentral Social-Media-Platform',
  meta: [
    { name: 'description', content: 'Decentral Social-Media-Platform' },
  ],
})
</script>

<template>
  <router-view />
</template>

