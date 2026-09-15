import { computed, ref } from 'vue'
import { getCategories, getProducts, getProductsByCategory, searchProducts } from '@/services/api/product'
import type { Category, Product } from '@/types/product'

const PAGE_SIZE = 12

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  const total = ref(0)
  const currentPage = ref(1)

  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

  async function loadCategories() {
    try {
      categories.value = await getCategories()
    } catch {
      // dropdown kategori cukup dikosongkan kalau gagal, bukan blocker utama halaman
    }
  }

  async function fetchProducts(page: number) {
    loading.value = true
    errorMessage.value = ''

    try {
      const query = searchQuery.value.trim()
      const skip = (page - 1) * PAGE_SIZE

      if (query) {
        const response = await searchProducts(query, 100, 0)
        const filtered = selectedCategory.value
          ? response.products.filter((product) => product.category === selectedCategory.value)
          : response.products
        total.value = filtered.length
        products.value = filtered.slice(skip, skip + PAGE_SIZE)
      } else if (selectedCategory.value) {
        const response = await getProductsByCategory(selectedCategory.value, PAGE_SIZE, skip)
        products.value = response.products
        total.value = response.total
      } else {
        const response = await getProducts(PAGE_SIZE, skip)
        products.value = response.products
        total.value = response.total
      }

      currentPage.value = page
    } catch {
      errorMessage.value = 'Gagal memuat produk. Periksa koneksi internet kamu, lalu coba lagi.'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    categories,
    searchQuery,
    selectedCategory,
    loading,
    errorMessage,
    total,
    currentPage,
    totalPages,
    loadCategories,
    fetchProducts,
  }
}
