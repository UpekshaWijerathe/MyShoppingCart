import { ref } from "vue"
import type { Product, ProductsResponse } from "../types"

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch("https://dummyjson.com/products?limit=30")
      const data: ProductsResponse = await response.json()
      products.value = data.products
    } catch (e) {
      error.value = "Failed to fetch products"
    } finally {
      loading.value = false
    }
  }

  const fetchByCategory = async (category: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`)
      const data: ProductsResponse = await response.json()
      products.value = data.products
    } catch (e) {
      error.value = "Failed to fetch products"
    } finally {
      loading.value = false
    }
  }

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      await fetchProducts()
      return
    }
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
      const data: ProductsResponse = await response.json()
      products.value = data.products
    } catch (e) {
      error.value = "Failed to search products"
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts, fetchByCategory, searchProducts }
}
