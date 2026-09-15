<script setup lang="ts">

import { computed, ref } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

function buildPages(windowSize: number) {
  const total = props.totalPages
  const current = props.currentPage
  const half = Math.floor(windowSize / 2)
  const start = Math.max(1, current - half)
  const end = Math.min(total, start + windowSize - 1)
  const from = Math.max(1, end - windowSize + 1)

  const range: number[] = []
  for (let i = from; i <= end; i++) {
    range.push(i)
  }
  return range
}

const pagesMobile = computed(() => buildPages(3))
const pagesDesktop = computed(() => buildPages(5))

function goTo(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('update:currentPage', page)
}

const activeEllipsis = ref<'start' | 'end' | null>(null)
const jumpValue = ref('')

function openJump(target: 'start' | 'end') {
  activeEllipsis.value = target
  jumpValue.value = ''
}

function submitJump() {
  const page = Number(jumpValue.value)
  if (Number.isInteger(page) && page >= 1 && page <= props.totalPages) {
    goTo(page)
  }
  activeEllipsis.value = null
}

function cancelJump() {
  activeEllipsis.value = null
}

</script>

<template>
  <div v-if="totalPages > 1" class="flex flex-wrap items-center justify-between gap-4">
    <p class="text-sm text-neutral-500">Halaman {{ currentPage }} dari {{ totalPages }}</p>

    <nav class="flex flex-wrap items-center justify-center gap-1 sm:hidden" aria-label="Pagination">
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="goTo(currentPage - 1)"
        class="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[#f0efe9]"
      >
        Prev
      </button>

      <template v-if="pagesMobile[0] > 1">
        <input
          v-if="activeEllipsis === 'start'"
          v-model="jumpValue"
          type="number"
          :min="1"
          :max="totalPages"
          autofocus
          @keyup.enter="submitJump"
          @blur="cancelJump"
          class="h-9 w-12 rounded-full border border-black/15 text-center text-sm outline-none focus:border-[#1f4d3d] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          v-else
          type="button"
          @click="openJump('start')"
          class="flex h-9 w-9 items-center justify-center text-sm text-neutral-400 hover:text-neutral-600"
        >
          …
        </button>
      </template>

      <button
        v-for="page in pagesMobile"
        :key="page"
        type="button"
        @click="goTo(page)"
        class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors"
        :class="page === currentPage ? 'bg-[#1f4d3d] text-white' : 'text-neutral-600 hover:bg-[#f0efe9]'"
      >
        {{ page }}
      </button>

      <template v-if="pagesMobile[pagesMobile.length - 1] < totalPages">
        <input
          v-if="activeEllipsis === 'end'"
          v-model="jumpValue"
          type="number"
          :min="1"
          :max="totalPages"
          autofocus
          @keyup.enter="submitJump"
          @blur="cancelJump"
          class="h-9 w-12 rounded-full border border-black/15 text-center text-sm outline-none focus:border-[#1f4d3d] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          v-else
          type="button"
          @click="openJump('end')"
          class="flex h-9 w-9 items-center justify-center text-sm text-neutral-400 hover:text-neutral-600"
        >
          …
        </button>
      </template>

      <button
        type="button"
        :disabled="currentPage === totalPages"
        @click="goTo(currentPage + 1)"
        class="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[#f0efe9]"
      >
        Next
      </button>
    </nav>

    <nav class="hidden flex-wrap items-center gap-1 sm:flex" aria-label="Pagination">
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="goTo(currentPage - 1)"
        class="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:bg-[#f0efe9]"
      >
        Prev
      </button>

      <template v-if="pagesDesktop[0] > 1">
        <input
          v-if="activeEllipsis === 'start'"
          v-model="jumpValue"
          type="number"
          :min="1"
          :max="totalPages"
          autofocus
          @keyup.enter="submitJump"
          @blur="cancelJump"
          class="h-9 w-12 rounded-full border border-black/15 text-center text-sm outline-none focus:border-[#1f4d3d] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          v-else
          type="button"
          @click="openJump('start')"
          class="flex h-9 w-9 items-center justify-center text-sm text-neutral-400 hover:text-neutral-600"
        >
          …
        </button>
      </template>

      <button
        v-for="page in pagesDesktop"
        :key="page"
        type="button"
        @click="goTo(page)"
        class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors"
        :class="page === currentPage ? 'bg-[#1f4d3d] text-white' : 'text-neutral-600 hover:bg-[#f0efe9]'"
      >
        {{ page }}
      </button>

      <template v-if="pagesDesktop[pagesDesktop.length - 1] < totalPages">
        <input
          v-if="activeEllipsis === 'end'"
          v-model="jumpValue"
          type="number"
          :min="1"
          :max="totalPages"
          autofocus
          @keyup.enter="submitJump"
          @blur="cancelJump"
          class="h-9 w-12 rounded-full border border-black/15 text-center text-sm outline-none focus:border-[#1f4d3d] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          v-else
          type="button"
          @click="openJump('end')"
          class="flex h-9 w-9 items-center justify-center text-sm text-neutral-400 hover:text-neutral-600"
        >
          …
        </button>
      </template>

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
