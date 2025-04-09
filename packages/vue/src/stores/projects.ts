import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Project } from '@geckobot/types'

import Datasource from '@/services'
import type { SelectableDataItem } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  // Data storage
  const items = ref<SelectableDataItem<Project>[]>([])

  // Select logic
  const selectedItems = computed(() => {
    return items.value.filter(({ selected }) => selected).map(({ data }) => data)
  })

  const allItemsSelected = computed(
    () => !(items.value.length === 0) && selectedItems.value.length === items.value.length,
  )

  function selectAllItems() {
    const state = !allItemsSelected.value
    for (let i = 0; i < items.value.length; i++) items.value[i].selected = state
  }

  // Loading data logic
  const loading = ref(false)
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

  function loadPage(pageNo: number) {
    if (pageNo < 1 || pageNo > totalPages.value) return

    currentPage.value = pageNo

    fetchItems()
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
    items: readonly(items),
    selectedItems,
    allItemsSelected,
    selectAllItems,
    loading: readonly(loading),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    fetchItems,
    loadPage,
    loadNextPage,
    loadPreviousPage,
  }
})
