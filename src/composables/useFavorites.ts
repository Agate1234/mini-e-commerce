import { ref, watch } from 'vue'
import type { Product } from '@/types/product'

const STORAGE_KEY = 'favorite-products'

function loadInitial(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Product[]) : []
  } catch {
    return []
  }
}

const favorites = ref<Product[]>(loadInitial())

watch(
  favorites,
  (list) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
      //
    }
  },
  { deep: true },
)

export function useFavorites() {
  function isFavorite(id: number) {
    return favorites.value.some((product) => product.id === id)
  }

  function toggleFavorite(product: Product) {
    if (isFavorite(product.id)) {
      favorites.value = favorites.value.filter((item) => item.id !== product.id)
    } else {
      favorites.value = [...favorites.value, product]
    }
  }

  return { favorites, isFavorite, toggleFavorite }
}
