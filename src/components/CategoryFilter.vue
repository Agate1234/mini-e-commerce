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
  <select
    :value="modelValue"
    @change="handleChange"
    aria-label="Filter kategori"
    class="w-full rounded border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f4d3d] sm:w-auto sm:min-w-[200px]"
  >
    <option value="">All Categories</option>
    <option v-for="category in categories" :key="category.slug" :value="category.slug">
      {{ category.name }}
    </option>
  </select>
</template>
