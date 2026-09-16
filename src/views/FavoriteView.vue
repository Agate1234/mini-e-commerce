<script setup lang="ts">

import ProductCard from '@/components/ProductCard.vue'
import { useFavorites } from '@/composables/useFavorites'

const { favorites } = useFavorites()

</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-10">
    <header class="mb-7">
      <h1 class="font-serif text-3xl text-neutral-900">Favorit Saya</h1>
      <p class="mt-1 text-neutral-500">Produk yang sudah kamu tandai sebagai favorit.</p>
    </header>

    <p v-if="favorites.length === 0" class="py-12 text-center text-neutral-500">
      Belum ada produk favorit. Tandai produk lewat ikon hati di halaman Products.
    </p>

    <div v-else class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
      <ProductCard v-for="product in favorites" :key="product.id" :product="product" />
    </div>
  </section>
</template>
