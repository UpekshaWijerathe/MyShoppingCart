<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <NavBar @openLogin="showLogin = true" @openCart="showCart = true" />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <RouterView />
    </main>
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <CartDrawer v-if="showCart" @close="showCart = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useAuthStore } from "./stores/authStore"
import NavBar from "./components/NavBar.vue"
import LoginModal from "./components/LoginModal.vue"
import CartDrawer from "./components/CartDrawer.vue"

const showLogin = ref(false)
const showCart = ref(false)
const authStore = useAuthStore()
onMounted(() => { authStore.loadFromStorage() })
</script>
