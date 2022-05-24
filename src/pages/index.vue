<script setup lang="ts">
import useTypingEffectWithCarousel from '@/composables/useTypingEffectWithCarousel'
import MetamaskSVGVue from '@/components/svg/MetamaskSVG.vue';
import LoginModal from '@/components/modals/LoginModal.vue';

import { onMounted, ref } from 'vue';
import { useWeb3Store } from '@/store/web3';

const web3Store = useWeb3Store()

const element = ref<HTMLSpanElement>()
const featureText = ref<HTMLSpanElement>()
const cursor = ref<HTMLSpanElement>()
const isModalOpen = ref(false)

const carouselText = [
  { text: 'Friendship.', color: '' },
  { text: 'Sharing.', color: '' },
  { text: 'Collaboration.', color: '' },
  { text: 'Community.', color: '' },
  { text: 'Uncensorability!', color: '' },
]

const defaultText = 'Built for'

onMounted(async () => {
  web3Store.connect(true)
  if (!element.value || !featureText.value) return
  await useTypingEffectWithCarousel(element.value, featureText.value, defaultText, carouselText)
  cursor.value?.classList.remove('input-cursor')
})
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}


</script>

<template>
  <div class="flex justify-between">
    <div class="">
      <div class="text-4xl lg:text-8xl uppercase font-[Roboto] tracking-wide">
        <div>
          <span>A</span>
          <span class="px-4 italic bg-blue-500">decentral</span>
        </div>
        <span>Social Media Platform</span>
      </div>
      <div
        class="flex justify-center mt-8 italic lg:mt-20 lg:justify-start text-glow">
        <span ref="element"
          class="sentence font-['Darker_Grotesque'] text-3xl lg:text-6xl"></span>
        <span ref="featureText"
          class="font-['Darker_Grotesque'] text-3xl lg:text-6xl ml-2 underline decoration-white"></span>
        <span ref="cursor"
          class="input-cursor h-8 lg:h-[3.75rem]"></span>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-8">
      <button @click="openModal"
        class="flex items-center justify-center px-5 py-2 font-semibold text-center transition duration-100 rounded-md outline-none sm:inline-flex bg-gradient-to-tr from-indigo-500 to-purple-400 hover:from-indigo-600 hover:to-purple-500 active:from-indigo-700 active:to-purple-600 focus-visible:ring ring-indigo-300">
        <MetamaskSVGVue />
        <span class="ml-4">Create your Account</span>
      </button>
      <div class="text-sm text-center text-gray-600">
        <p>MetaMask will automatically open and ask you to confirm a
          transaction.</p>
        <p>Please note that creating an account on the Ethereum blockchain costs
          a small amount of Ether.</p>
      </div>
    </div>
    <LoginModal :is-modal-open="isModalOpen"
      @close-modal="closeModal" />
  </div>
</template>

<route lang="yaml">
name: home
meta: 
  layout: landingLayout
</route>

<style>
@keyframes blink {
  0% {
    opacity: 1;
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.input-cursor {
  display: inline-block;
  width: 2px;
  height: 60px;
  background-color: white;
  margin-left: 8px;
  animation: blink 0.6s linear infinite alternate;
}

.input-cursor {
  display: inline-block;
  width: 2px;
  height: 60px;
  background-color: white;
  margin-left: 8px;
  animation: blink 0.6s linear infinite alternate;
}
</style>