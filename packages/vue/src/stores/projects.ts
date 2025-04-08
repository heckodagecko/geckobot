import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Project } from '@geckobot/types'

import Datasource from '@/services'
import type { SelectableDataItem } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  const loading = ref(false)

  const items = ref<SelectableDataItem<Project>[]>([])

  const selectedItems = computed(() => {
    return items.value.filter(({ selected }) => selected)
  })

  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalPages = ref(1)
  const totalItems = ref(1)

  async function fetchItems() {
    loading.value = true

    const {
      data,
      _paging: { totalCount, totalPages: _totalPages },
    } = await Datasource.projects.getAll({
      pageNo: currentPage.value,
      pageSize: pageSize.value,
    })

    items.value = data.map((item) => ({ selected: false, data: item }))
    totalPages.value = _totalPages
    totalItems.value = totalCount

    loading.value = false
  }

  function loadNextPage() {
    if (currentPage.value === totalPages.value) return

    currentPage.value++

    fetchItems()
  }

  function loadPreviousPage() {
    if (currentPage.value === 1) return

    currentPage.value--

    fetchItems()
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    selectedItems,
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    fetchItems,
    loadNextPage,
    loadPreviousPage,
  }
})
