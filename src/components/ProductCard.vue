<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer" @click="goToProduct">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover rounded-t-xl" />
    <div class="p-4">
      <h3 class="font-semibold text-gray-800 dark:text-white text-sm truncate">{{ product.title }}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{{ product.category }}</p>
      <div class="flex items-center justify-between mt-3">
        <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
        <span class="text-xs text-yellow-500">{{ product.rating }}/5</span>
      </div>
      <button class="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors" @click.stop="addToCart">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cartStore"
import type { Product } from "../types"

const props = defineProps<{ product: Product }>()
const router = useRouter()
const cartStore = useCartStore()

const goToProduct = () => { router.push(`/product/${props.product.id}`) }
const addToCart = () => { cartStore.addItem(props.product) }
</script>
