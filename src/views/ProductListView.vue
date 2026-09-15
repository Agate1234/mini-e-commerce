<script setup lang="ts">
import { onMounted, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Pagination from '@/components/Pagination.vue'
import { useProducts } from '@/composables/useProducts'

const {
  products,
  categories,
  searchQuery,
  selectedCategory,
  loading,
  errorMessage,
  currentPage,
  totalPages,
  loadCategories,
  fetchProducts,
} = useProducts()

function handlePageChange(page: number) {
  fetchProducts(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleSearch() {
  fetchProducts(1)
}

watch(selectedCategory, () => {
  fetchProducts(1)
})

onMounted(() => {
  loadCategories()
  fetchProducts(1)
})
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-10">
    <header class="mb-7">
      <h1 class="font-serif text-3xl text-neutral-900">Products</h1>
      <p class="mt-1 text-neutral-500">Jelajahi katalog produk kami dan temukan yang kamu butuhkan.</p>
    </header>

    <div class="mb-8 flex flex-wrap gap-3">
      <SearchInput v-model="searchQuery" @search="handleSearch" />
      <CategoryFilter v-model="selectedCategory" :categories="categories" />
    </div>

    <p v-if="errorMessage" class="flex flex-col items-center gap-3 py-10 text-center text-red-700">
      {{ errorMessage }}
      <button
        type="button"
        @click="fetchProducts(currentPage)"
        class="rounded border border-primary px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-white"
      >
        Coba Lagi
      </button>
    </p>

    <LoadingSpinner v-else-if="loading" />

    <p v-else-if="products.length === 0" class="py-12 text-center text-neutral-500">
      Produk tidak ditemukan untuk pencarian ini.
    </p>

    <template v-else>
      <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>

      <div class="mt-10">
        <Pagination :current-page="currentPage" :total-pages="totalPages" @update:current-page="handlePageChange" />
      </div>
    </template>
  </section>
</template>
