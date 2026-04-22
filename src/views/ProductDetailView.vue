<template>
  <div class="max-w-4xl mx-auto">
    <button @click="router.back()" class="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
      Back
    </button>
    <div v-if="loading" class="text-center py-20">
      <p class="text-gray-500">Loading product...</p>
    </div>
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else-if="product" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div>
          <img :src="selectedImage" :alt="product.title" class="w-full h-80 object-contain rounded-xl bg-gray-50 p-4" />
          <div class="flex gap-2 mt-4 overflow-x-auto">
            <img
              v-for="image in product.images"
              :key="image"
              :src="image"
              @click="selectedImage = image"
              class="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 hover:border-blue-400 transition-colors"
              :class="selectedImage === image ? `border-blue-600` : `border-transparent`"
            />
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <span class="text-sm text-blue-600 font-medium capitalize">{{ product.category }}</span>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">{{ product.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ product.description }}</p>
          <div class="flex items-center gap-3">
            <span class="text-3xl font-bold text-blue-600">${{ product.price }}</span>
            <span class="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">{{ product.discountPercentage }}% off</span>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>Rating: {{ product.rating }}/5</span>
            <span>Stock: {{ product.stock }} left</span>
            <span class="capitalize">Brand: {{ product.brand }}</span>
          </div>
          <button @click="addToCart" class="mt-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCartStore } from "../stores/cartStore"
import type { Product } from "../types"

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const selectedImage = ref("")

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    product.value = await response.json()
    selectedImage.value = product.value!.thumbnail
  } catch (e) {
    error.value = "Failed to load product"
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value)
  }
}
</script>

