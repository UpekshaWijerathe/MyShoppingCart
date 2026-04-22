<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <NavBar @openLogin="showLogin = true" @openCart="showCart = true" @search="onSearch" />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <RouterView :searchQuery="searchQuery" />
    </main>
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <CartDrawer v-if="showCart" @close="showCart = false" />
    <div v-if="showToast" class="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all">
      Item added to cart!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useAuthStore } from "./stores/authStore"
import { useCartStore } from "./stores/cartStore"
import NavBar from "./components/NavBar.vue"
import LoginModal from "./components/LoginModal.vue"
import CartDrawer from "./components/CartDrawer.vue"

const showLogin = ref(false)
const showCart = ref(false)
const showToast = ref(false)
const searchQuery = ref("")
const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => { authStore.loadFromStorage() })

const onSearch = (query: string) => { searchQuery.value = query }

watch(() => cartStore.totalItems, (newVal, oldVal) => {
  if (newVal > oldVal) {
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 2000)
  }
})
</script>
