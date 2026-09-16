<script setup lang="ts">

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProduct } from '@/composables/useProduct'
import { useFavorites } from '@/composables/useFavorites'

const route = useRoute()
const router = useRouter()
const { isFavorite, toggleFavorite } = useFavorites()
const { product, activeImage, loading, errorMessage } = useProduct(() => route.params.id as string)

const formattedPrice = computed(() =>
  product.value
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.value.price)
    : '',
)

const categoryLabel = computed(() =>
  product.value
    ? product.value.category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '',
)

</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <button type="button" @click="router.back()" class="mb-6 text-sm font-medium text-neutral-500 hover:text-[#1f4d3d]">
      ← Kembali
    </button>

    <div v-if="loading" class="py-16 text-center text-neutral-500">Memuat produk...</div>

    <div v-else-if="errorMessage" class="py-16 text-center text-red-700">{{ errorMessage }}</div>

    <div v-else-if="product" class="grid gap-10 md:grid-cols-2">
      <div>
        <div class="mb-3 flex aspect-square items-center justify-center rounded-md bg-[#f5f3ee] p-8">
          <img :src="activeImage" :alt="product.title" class="max-h-full max-w-full object-contain" />
        </div>
        <div v-if="product.images?.length > 1" class="flex gap-2 overflow-x-auto">
          <button
            v-for="image in product.images"
            :key="image"
            type="button"
            @click="activeImage = image"
            class="h-16 w-16 shrink-0 rounded border p-1"
            :class="activeImage === image ? 'border-[#1f4d3d]' : 'border-black/10'"
          >
            <img :src="image" :alt="product.title" class="h-full w-full object-contain" />
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div>
          <p class="text-sm font-medium uppercase tracking-wide text-[#1f4d3d]">{{ categoryLabel }}</p>
          <h1 class="font-serif text-2xl text-neutral-900">{{ product.title }}</h1>
        </div>

        <p class="text-2xl font-semibold text-[#1f4d3d]">{{ formattedPrice }}</p>

        <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <span class="flex items-center gap-1">
            <span class="text-amber-500">★</span>
            {{ product.rating.toFixed(1) }} rating
          </span>
          <span>{{ product.stock }} stok tersedia</span>
        </div>

        <p class="leading-relaxed text-neutral-600">{{ product.description }}</p>

        <button
          type="button"
          @click="toggleFavorite(product)"
          class="flex items-center justify-center gap-2 rounded border px-5 py-2.5 font-semibold transition-colors"
          :class="
            isFavorite(product.id)
              ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
              : 'border-[#1f4d3d] text-[#1f4d3d] hover:bg-[#1f4d3d] hover:text-white'
          "
        >
          {{ isFavorite(product.id) ? '♥ Hapus dari Favorit' : '♡ Tambah ke Favorit' }}
        </button>
      </div>
    </div>
  </section>
</template>
