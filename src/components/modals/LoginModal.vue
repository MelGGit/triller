<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { emit } from 'process';

defineProps<{
  isModalOpen: boolean
}>()

const emits = defineEmits<{
  (event: 'close-modal'): void
}>()

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const bio = ref('')

const closeModal = () => {
  emits('close-modal')
}

const createAccount = () => {
  if (username.value.length > 0) {
    firstName.value = ''
    lastName.value = ''
    username.value = ''
    email.value = ''
    bio.value = ''
    closeModal()
  }
}

</script>
<template>
  <TransitionRoot as="template"
    :show="isModalOpen">
    <Dialog as="div"
      class="relative z-10"
      @close="closeModal">
      <TransitionChild as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-0 text-center">
          <TransitionChild as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative px-10 py-8 overflow-hidden text-left transition-all transform border border-gray-800 rounded-lg shadow-xl bg-zinc-900">
              <form class="space-y-6 text-lg"
                @submit.prevent="createAccount">
                <div>
                  <label for="firstname"
                    class="modal-login-label"> First name
                  </label>
                  <div class="mt-1">
                    <input id="firstname"
                      v-model="firstName"
                      name="firstname"
                      type="text"
                      autocomplete="given-name"
                      class="modal-login-input" />
                  </div>
                </div>
                <div>
                  <label for="lastname"
                    class="modal-login-label"> Last name
                  </label>
                  <div class="mt-1">
                    <input id="lastname"
                      v-model="lastName"
                      name="lastname"
                      type="text"
                      autocomplete="family-name"
                      class="modal-login-input" />
                  </div>
                </div>
                <div>
                  <label for="username"
                    class="modal-login-label"> Username
                  </label>
                  <div class="mt-1">
                    <input id="username"
                      v-model="username"
                      name="username"
                      type="text"
                      autocomplete="username"
                      required
                      class="modal-login-input" />
                  </div>
                </div>
                <div>
                  <label for="email"
                    class="modal-login-label">
                    Email address
                  </label>
                  <div class="mt-1">
                    <input id="email"
                      v-model="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      class="modal-login-input" />
                  </div>
                </div>

                <div>
                  <label for="bio"
                    class="modal-login-label"> Bio
                  </label>
                  <div class="mt-1">
                    <textarea id="bio"
                      v-model="bio"
                      name="bio"
                      type="text"
                      autocomplete="false"
                      class="modal-login-input" />
                  </div>
                </div>

                <div>
                  <button type="submit"
                    @submit.prevent="createAccount"
                    class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Account
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
