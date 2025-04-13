<script setup lang="ts" generic="T extends object">
interface DataTableRowProps<T> {
  selectable?: boolean
  selected?: boolean
  columns?: (keyof T)[]
  data: T
}

interface DataTableRowEvents {
  (event: 'update:selected', value: boolean): void
}

const props = defineProps<DataTableRowProps<T>>()
defineEmits<DataTableRowEvents>()

const keys = props.columns != null ? props.columns : (Object.keys(props.data) as (keyof T)[])
</script>

<template>
  <tr :class="[selected ? 'bg-base-300' : 'hover:bg-base-300']">
    <td v-if="selectable">
      <input
        type="checkbox"
        class="checkbox checkbox-primary"
        :checked="selected"
        @change="(e) => $emit('update:selected', (e.target as HTMLInputElement).checked)"
      />
    </td>
    <td v-for="(key, index) in keys" :key="index">
      <slot :name="`item.${String(key)}`" :item="data">
        {{ data[key] }}
      </slot>
    </td>
    <td v-if="$slots.actions">
      <slot name="actions" :item="data"></slot>
    </td>
  </tr>
</template>
