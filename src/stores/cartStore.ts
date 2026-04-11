import { defineStore } from "pinia"
import type { Product } from "../types"

interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
      this.saveToStorage()
    },

    removeItem(productId: number) {
      this.items = this.items.filter(i => i.product.id !== productId)
      this.saveToStorage()
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(i => i.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.saveToStorage()
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },

    saveToStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items))
    },
  },
})
