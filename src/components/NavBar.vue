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
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const searchQuery = ref("")
const emit = defineEmits(["search"])

const onSearch = () => {
  emit("search", searchQuery.value)
}
</script>
