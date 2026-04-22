<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="emit(`close`)">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Login</h2>
      <div class="flex flex-col gap-4">
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-400"
          />
        </div>
        <p v-if="authStore.error" class="text-red-500 text-sm">{{ authStore.error }}</p>
        <button
          @click="handleLogin"
          :disabled="authStore.loading"
          class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition-colors"
        >
          {{ authStore.loading ? "Logging in..." : "Login" }}
        </button>
        <p class="text-xs text-gray-400 text-center">Test: emilys / emilyspass</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/authStore"

const authStore = useAuthStore()
const emit = defineEmits(["close"])
const username = ref("")
const password = ref("")

const handleLogin = async () => {
  await authStore.login({ username: username.value, password: password.value })
  if (authStore.isLoggedIn) emit("close")
}
</script>
