import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import type { Project } from '@geckobot/datasource'

import Datasource from '@/datasource'

export const useProjectsStore = defineStore('projects', () => {
  const loading = ref(false)

  const items = ref<Project[]>([])
  const totalItems = ref(0)

  const withTrashed = ref(false)
  const pageSize = ref(10)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchTerm = ref<string | null>(null)

  async function loadItems() {
    loading.value = true

    const {
      data,
      _paging: { totalCount, totalPages: _totalPages },
    } = await Datasource.projects.getAll(
      {
        pageNo: currentPage.value,
        pageSize: pageSize.value,
        includeTrashed: withTrashed.value,
      },
      searchTerm.value,
    )

    items.value = data
    totalPages.value = _totalPages
    totalItems.value = totalCount

    loading.value = false
  }

  function setSearchTerm(value: string | null) {
    searchTerm.value = value
    loadItems()
  }

  function loadPage(pageNo: number) {
    if (pageNo < 1 || pageNo > totalPages.value) return
    currentPage.value = pageNo
    loadItems()
  }

  function loadNextPage() {
    if (currentPage.value === totalPages.value) return
    currentPage.value++
    loadItems()
  }

  function loadPreviousPage() {
    if (currentPage.value === 1) return
    currentPage.value--
    loadItems()
  }

  function setIncludeTrashed(value: boolean) {
    withTrashed.value = value
    loadItems()
  }

  function setPageSize(size: number) {
    pageSize.value = size
    currentPage.value = 1
    loadItems()
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    withTrashed: readonly(withTrashed),
    totalItems: readonly(totalItems),
    pageSize: readonly(pageSize),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    searchTerm: readonly(searchTerm),
    setSearchTerm,
    loadItems,
    loadPage,
    loadNextPage,
    loadPreviousPage,
    setIncludeTrashed,
    setPageSize,
  }
})
