<script setup lang="ts">
interface DataTableHeaderProps {
  selectable?: boolean
  selected?: boolean
  disabled?: boolean
  headers: string[]
}

interface DataTableHeaderEvents {
  (event: 'selectAll'): void
}

defineProps<DataTableHeaderProps>()
defineEmits<DataTableHeaderEvents>()
</script>

<template>
  <tr>
    <th v-if="selectable">
      <input
        type="checkbox"
        class="checkbox checkbox-primary"
        :checked="selected"
        :disabled="disabled"
        @change="() => $emit('selectAll')"
      />
    </th>
    <th v-for="(header, index) in headers" :key="index">
      {{ header }}
    </th>
    <td v-if="$slots.actions">Actions</td>
  </tr>
</template>
