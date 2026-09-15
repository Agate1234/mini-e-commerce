<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types/product'
import { useFavorites } from '@/composables/useFavorites'

const props = defineProps<{
  product: Product
}>()

const { isFavorite, toggleFavorite } = useFavorites()

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.product.price),
)

const categoryLabel = computed(() =>
  props.product.category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
)

const ratingLabel = computed(() => props.product.rating.toFixed(1))
</script>

<template>
  <article
    class="flex flex-col overflow-hidden rounded-md border border-black/10 bg-white transition-colors hover:border-primary/40"
  >
    <div class="relative flex aspect-square items-center justify-center bg-[#f5f3ee] p-6">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="max-h-full max-w-full object-contain" />

      <button
        type="button"
        @click="toggleFavorite(product)"
        :aria-pressed="isFavorite(product.id)"
        :aria-label="isFavorite(product.id) ? 'Hapus dari favorit' : 'Tambah ke favorit'"
        class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          class="h-5 w-5"
          :class="isFavorite(product.id) ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-neutral-500'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 20s-7-4.35-9.5-8.5C.5 8 2 4.5 5.5 4.5c2 0 3.5 1.2 4.5 2.7C11 5.7 12.5 4.5 14.5 4.5 18 4.5 19.5 8 19.5 11.5 17 15.65 12 20 12 20z"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-1 flex-col gap-2 p-4">
      <h3 class="min-h-[2.7em] font-serif text-base leading-snug text-neutral-900">{{ product.title }}</h3>
      <p class="text-lg font-semibold text-primary">{{ formattedPrice }}</p>

      <dl class="text-sm text-neutral-500">
        <div class="flex justify-between py-0.5">
          <dt>Kategori</dt>
          <dd class="font-medium text-neutral-700">{{ categoryLabel }}</dd>
        </div>
        <div class="flex justify-between py-0.5">
          <dt>Rating</dt>
          <dd class="flex items-center gap-1 font-medium text-neutral-700">
            <span class="text-amber-500" aria-hidden="true">★</span>
            {{ ratingLabel }}
          </dd>
        </div>
      </dl>

      <RouterLink
        :to="`/product/${product.id}`"
        class="mt-auto rounded border border-primary py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        Lihat Detail
      </RouterLink>
    </div>
  </article>
</template>
