<script setup lang="ts">
interface DataTablePageSizeProps {
  options: number[]
}

defineProps<DataTablePageSizeProps>()

interface DataTablePageSizeEvents {
  (event: 'change', size: number): void
}

const emit = defineEmits<DataTablePageSizeEvents>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = parseInt(target.value, 10)
  emit('change', value)
}
</script>

<template>
  <div class="inline-flex items-center space-x-2">
    <select @change="handleChange" class="select w-auto">
      <option v-for="(size, index) in options" :value="size" :key="index">
        {{ size }}
      </option>
    </select>
    <span>Entries per page</span>
  </div>
</template>
