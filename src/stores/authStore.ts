import { defineStore } from "pinia"
import type { AuthUser, LoginCredentials } from "../types"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthUser | null,
    isLoggedIn: false,
    error: null as string | null,
    loading: false,
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })
        if (!response.ok) throw new Error("Invalid credentials")
        const data: AuthUser = await response.json()
        this.user = data
        this.isLoggedIn = true
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data))
      } catch (e) {
        this.error = "Invalid username or password"
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },

    loadFromStorage() {
      const user = localStorage.getItem("user")
      const token = localStorage.getItem("token")
      if (user && token) {
        this.user = JSON.parse(user)
        this.isLoggedIn = true
      }
    },
  },
})
