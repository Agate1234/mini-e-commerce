<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    debounceMs?: number
  }>(),
  {
    placeholder: 'Search product...',
    debounceMs: 400,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

let timer: ReturnType<typeof setTimeout> | undefined

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)

  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('search', value)
  }, props.debounceMs)
}

</script>

<template>
  <input
    :value="modelValue"
    @input="handleInput"
    type="text"
    :placeholder="placeholder"
    aria-label="Cari produk"
    class="w-full rounded border border-black/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f4d3d] sm:min-w-[260px] sm:flex-1"
  />
</template>
