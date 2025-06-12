<script setup lang="ts" generic="T extends object">
import { computed, readonly, ref, watch } from 'vue'
import type { Ref } from 'vue'

import DataTableHeader from '@/components/DataTable/DataTableHeader.vue'
import DataTableRow from '@/components/DataTable/DataTableRow.vue'
import { toReadable } from '@/utils'
import type { DataItem } from '@/types'

interface DataTableProps {
  selectable?: boolean
  loading?: boolean
  columns?: (keyof T)[] | [keyof T, string][]
  items: readonly T[]
}

const props = defineProps<DataTableProps>()

const dataItems = ref([]) as Ref<DataItem<T>[]>

watch(
  () => props.items,
  (newValue) => {
    dataItems.value = newValue.map((data) => ({
      selected: props.selectable ? false : undefined,
      data,
    }))
  },
)

const selectedItems = computed(() =>
  dataItems.value.filter(({ selected }) => selected).map(({ data }) => data),
)

const allItemsSelected = computed(
  () => !(dataItems.value.length === 0) && selectedItems.value.length === dataItems.value.length,
)

function selectAllItems() {
  const state = !allItemsSelected.value
  for (let i = 0; i < dataItems.value.length; i++) {
    dataItems.value[i].selected = state
  }
}

const columns = ref([]) as Ref<(keyof T)[]>
const headers = ref([]) as Ref<string[]>

watch(
  () => props.columns,
  (newCols) => {
    columns.value = []
    headers.value = []

    if (!newCols || newCols.length === 0) {
      const entries = Object.keys(props.items[0])

      for (let i = 0; i < entries.length; i++) {
        const element = entries[i]

        columns.value.push(element as keyof T)
        headers.value.push(toReadable(element))
      }
    } else {
      for (let i = 0; i < newCols.length; i++) {
        const element = newCols[i]

        if (Array.isArray(element)) {
          columns.value.push(element[0])
          headers.value.push(element[1])
        } else {
          columns.value.push(element)
          headers.value.push(toReadable(String(element)))
        }
      }
    }
  },
)

defineExpose({ selectedItems: readonly(selectedItems) })
</script>

<template>
  <table class="table">
    <thead>
      <DataTableHeader
        :selectable="selectable"
        :headers="headers"
        :selected="allItemsSelected"
        :disabled="dataItems.length === 0"
        @select-all="selectAllItems"
      >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </DataTableHeader>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td class="text-center" colspan="100%">
          <slot name="loading">
            <span class="loading loading-ring loading-lg"></span>
          </slot>
        </td>
      </tr>
      <tr v-else-if="dataItems.length === 0">
        <td class="text-center" colspan="100%">
          <slot name="no-items">No items found.</slot>
        </td>
      </tr>
      <template v-else>
        <DataTableRow
          v-for="(item, index) in dataItems"
          v-model:selected="item.selected"
          :selectable="selectable"
          :columns="columns"
          :data="item.data"
          :key="index"
        >
          <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
          </template>
        </DataTableRow>
      </template>
    </tbody>
  </table>
</template>
