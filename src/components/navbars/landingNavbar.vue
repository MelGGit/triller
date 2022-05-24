<script setup lang="ts">
import GithubSVGVue from '@/components/svg/GithubSVG.vue'
import TrillerIconSVGVue from '@/components/svg/TrillerIconSVG.vue'
import { useWeb3Store } from '@/store/web3';

const web3Store = useWeb3Store()


</script>

<template>
  <header>
    <nav class="flex items-center justify-between w-full px-20 py-2 shadow-md">
      <div class="flex items-center">
        <TrillerIconSVGVue width="63" />
        <router-link :to="{ name: 'home' }"
          class="ml-6">
          <div
            class="font-bold font-['Roboto'] lg:text-5xl text-4xl tracking-wide italic">
            triller</div>
        </router-link>
      </div>
      <div class="flex items-center h-full gap-4">
        <div class="relative group">
          <div
            class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
          </div>
          <button
            class="relative flex items-center py-4 leading-none rounded-lg bg-zinc-900 px-7">
            <span class="transition duration-200">
              {{ !web3Store.isLoggedIn ? 'Sign up / Sign In' : `${web3Store.userProfile.email} ${web3Store.userProfile.lastName}` }}
            </span>
          </button>
        </div>
        <a target="_blank"
          referrerpolicy="no-referrer"
          href="https://github.com/zynth17/vitailse">
          <GithubSVGVue class="fill-white" />
        </a>
      </div>
    </nav>
  </header>
</template>

