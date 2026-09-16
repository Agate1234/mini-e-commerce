<script setup lang="ts">

withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 8,
  },
)

</script>

<template>
  <div
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    role="status"
    aria-label="Memuat produk"
  >
    <div
      v-for="item in count"
      :key="item"
      class="overflow-hidden rounded-xl border border-neutral-200 bg-white"
    >
      <div class="aspect-square animate-pulse bg-neutral-200"></div>

      <div class="space-y-3 p-4">
        <div class="h-3 w-20 animate-pulse rounded bg-neutral-200"></div>

        <div class="space-y-2">
          <div class="h-4 w-full animate-pulse rounded bg-neutral-200"></div>
          <div class="h-4 w-3/4 animate-pulse rounded bg-neutral-200"></div>
        </div>

        <div class="h-5 w-24 animate-pulse rounded bg-neutral-200"></div>

        <div class="h-3 w-16 animate-pulse rounded bg-neutral-200"></div>
      </div>
    </div>

    <span class="sr-only">Memuat produk...</span>
  </div>
</template>
