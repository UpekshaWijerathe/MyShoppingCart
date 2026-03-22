<template>
  <div class="flex gap-2 flex-wrap mb-6">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      :class="[
        selectedCategory === category
          ? `bg-blue-600 text-white`
          : `bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-blue-400`,
        `px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer`
      ]"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  categories: string[]
  selectedCategory: string
}>()

const emit = defineEmits(["select"])

const selectCategory = (category: string) => {
  emit("select", category)
}
</script>
