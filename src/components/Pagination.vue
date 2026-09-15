<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const pages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  const from = Math.max(1, end - 4)

  const range: number[] = []
  for (let i = from; i <= end; i++) {
    range.push(i)
  }
  return range
})

function goTo(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('update:currentPage', page)
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex flex-wrap items-center justify-between gap-4">
    <p class="text-sm text-neutral-500">Halaman {{ currentPage }} dari {{ totalPages }}</p>

    <nav class="flex items-center gap-1" aria-label="Pagination">
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="goTo(currentPage - 1)"
        class="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[#f0efe9]"
      >
        Prev
      </button>

      <span v-if="pages[0] > 1" class="flex h-9 w-9 items-center justify-center text-sm text-neutral-400">…</span>

      <button
        v-for="page in pages"
        :key="page"
        type="button"
        @click="goTo(page)"
        class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors"
        :class="page === currentPage ? 'bg-[#1f4d3d] text-white' : 'text-neutral-600 hover:bg-[#f0efe9]'"
      >
        {{ page }}
      </button>

      <span v-if="pages[pages.length - 1] < totalPages" class="flex h-9 w-9 items-center justify-center text-sm text-neutral-400">…</span>

      <button
        type="button"
        :disabled="currentPage === totalPages"
        @click="goTo(currentPage + 1)"
        class="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[#f0efe9]"
      >
        Next
      </button>
    </nav>
  </div>
</template>
