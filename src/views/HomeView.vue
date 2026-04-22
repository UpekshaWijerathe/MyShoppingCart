<template>
  <div>
    <FilterBar :categories="categories" :selectedCategory="selectedCategory" @select="onCategorySelect" />
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductSkeleton v-for="n in 8" :key="n" />
    </div>
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else-if="products.length === 0" class="text-center py-20">
      <p class="text-gray-500">No products found.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useProducts } from "../composables/useProducts"
import ProductCard from "../components/ProductCard.vue"
import ProductSkeleton from "../components/ProductSkeleton.vue"
import FilterBar from "../components/FilterBar.vue"

const props = defineProps<{ searchQuery?: string }>()
const { products, loading, error, fetchProducts, fetchByCategory, searchProducts } = useProducts()

const categories = ref(["All", "beauty", "fragrances", "furniture", "groceries", "home-decoration", "kitchen-accessories", "laptops", "mens-shirts", "mens-shoes", "mens-watches", "mobile-accessories", "motorcycles", "skin-care", "smartphones", "sports-accessories", "sunglasses", "tablets", "tops", "vehicle", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"])
const selectedCategory = ref("All")

watch(() => props.searchQuery, async (query) => {
  if (query !== undefined) {
    selectedCategory.value = "All"
    await searchProducts(query)
  }
})

const onCategorySelect = async (category: string) => {
  selectedCategory.value = category
  if (category === "All") {
    await fetchProducts()
  } else {
    await fetchByCategory(category)
  }
}

onMounted(() => { fetchProducts() })
</script>
