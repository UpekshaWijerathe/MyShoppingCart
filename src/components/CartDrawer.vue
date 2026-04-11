<template>
  <div class="fixed inset-0 z-50 flex justify-end">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="emit(`close`)"></div>
    <div class="relative bg-white dark:bg-gray-800 w-full max-w-md h-full flex flex-col shadow-xl">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Cart ({{ cartStore.totalItems }})</h2>
        <button @click="emit(`close`)" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-2xl">&times;</button>
      </div>
      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="cartStore.items.length === 0" class="text-center py-20">
          <p class="text-gray-500">Your cart is empty</p>
        </div>
        <div v-else class="flex flex-col gap-4">
          <div v-for="item in cartStore.items" :key="item.product.id" class="flex gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <img :src="item.product.thumbnail" :alt="item.product.title" class="w-16 h-16 object-cover rounded-lg" />
            <div class="flex-1">
              <h3 class="text-sm font-semibold text-gray-800 dark:text-white truncate">{{ item.product.title }}</h3>
              <p class="text-blue-600 font-bold text-sm">${{ item.product.price }}</p>
              <div class="flex items-center gap-2 mt-2">
                <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)" class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white text-sm hover:bg-gray-300">-</button>
                <span class="text-sm text-gray-800 dark:text-white">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)" class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white text-sm hover:bg-gray-300">+</button>
                <button @click="cartStore.removeItem(item.product.id)" class="ml-auto text-red-500 hover:text-red-600 text-xs">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between mb-4">
          <span class="font-semibold text-gray-800 dark:text-white">Total</span>
          <span class="font-bold text-blue-600">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <button @click="cartStore.clearCart()" class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors mb-2">Clear Cart</button>
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cartStore"
const cartStore = useCartStore()
const emit = defineEmits(["close"])
</script>
