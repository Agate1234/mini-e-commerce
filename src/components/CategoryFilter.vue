<script setup lang="ts">

import type { Category } from '@/types/product'

defineProps<{
  categories: Category[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}

</script>

<template>
  <div class="relative w-full sm:w-auto">
    <select
      :value="modelValue"
      @change="handleChange"
      aria-label="Filter kategori"
      class="w-full appearance-none rounded border border-black/15 bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:ring-2 focus:ring-[#1f4d3d] sm:w-auto sm:min-w-[200px]"
    >
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category.slug" :value="category.slug">
        {{ category.name }}
      </option>
    </select>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  </div>
</template>
