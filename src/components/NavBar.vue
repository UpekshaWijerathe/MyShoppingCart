<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
      <h1 class="text-xl font-bold text-blue-600 cursor-pointer" @click="router.push(`/`)">MyStore</h1>
      <div class="flex-1">
        <input
          v-model="searchQuery"
          @input="onSearch"
          type="text"
          placeholder="Search products..."
          class="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-400"
        />
      </div>
      <button @click="router.push(`/`)" class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Home</button>
      <button @click="toggleDark" class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 px-2">
        {{ isDark ? "Light" : "Dark" }}
      </button>
      <button @click="emit(`openCart`)" class="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
        Cart
        <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {{ cartStore.totalItems }}
        </span>
      </button>
      <div v-if="authStore.isLoggedIn" class="flex items-center gap-3">
        <span class="text-sm text-gray-600 dark:text-gray-300">Hi, {{ authStore.user?.firstName }}</span>
        <button @click="authStore.logout()" class="text-sm text-red-500 hover:text-red-600 font-medium">Logout</button>
      </div>
      <button v-else @click="emit(`openLogin`)" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
        Login
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { useCartStore } from "../stores/cartStore"

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const searchQuery = ref("")
const emit = defineEmits(["search", "openLogin", "openCart"])
const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem("darkMode")
  isDark.value = saved === "true"
  document.documentElement.classList.toggle("dark", isDark.value)
})

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle("dark", isDark.value)
  localStorage.setItem("darkMode", String(isDark.value))
}

const onSearch = () => { emit("search", searchQuery.value) }
</script>
