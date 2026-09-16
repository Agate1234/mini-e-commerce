<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'

const { favorites } = useFavorites()
</script>

<template>
  <div class="min-h-screen bg-[#faf9f6]">
    <nav class="border-b border-black/10 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="font-serif text-lg text-neutral-900">MiniShop</RouterLink>
        <div class="flex items-center gap-6 text-sm font-medium text-neutral-600">
          <RouterLink to="/" class="hover:text-primary" active-class="text-primary">Products</RouterLink>
          <RouterLink
            to="/favorites"
            class="flex items-center gap-1.5 hover:text-[#1f4d3d]"
            active-class="text-[#1f4d3d]"
          >
            Favorit
            <span
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1f4d3d] px-1 text-xs text-white"
              :class="favorites.length > 0 ? 'visible' : 'invisible'"
            >
              {{ favorites.length }}
            </span>
          </RouterLink>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
