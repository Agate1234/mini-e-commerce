import { ref, watch } from 'vue'
import { getProductById } from '@/services/api/product'
import type { Product } from '@/types/product'

export function useProduct(id: () => string | undefined) {
  const product = ref<Product | null>(null)
  const activeImage = ref('')
  const loading = ref(false)
  const errorMessage = ref('')

  async function load(productId: string) {
    loading.value = true
    errorMessage.value = ''
    try {
      const result = await getProductById(productId)
      product.value = result
      activeImage.value = result.images?.[0] ?? result.thumbnail
    } catch {
      errorMessage.value = 'Produk tidak ditemukan atau gagal dimuat.'
      product.value = null
    } finally {
      loading.value = false
    }
  }

  watch(
    id,
    (newId) => {
      if (newId) load(newId)
    },
    { immediate: true },
  )

  return { product, activeImage, loading, errorMessage }
}
