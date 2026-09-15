<script setup lang="ts">

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Memuat...',
  },
)
</script>

<template>
  <div class="flex flex-col items-center gap-2 py-10 text-neutral-500" role="status">
    <span class="h-7 w-7 animate-spin rounded-full border-[3px] border-primary/15 border-t-primary"></span>
    <span class="text-sm">{{ label }}</span>
  </div>
</template>
