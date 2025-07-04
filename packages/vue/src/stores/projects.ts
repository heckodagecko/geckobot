import { defineStore } from 'pinia'
import { ref, readonly, reactive } from 'vue'
import type { Project, ProjectTag } from '@geckobot/datasource'

import Datasource from '@/datasource'

export const useProjectsStore = defineStore('projects', () => {
  const loading = ref(false)

  const items = ref<Project[]>([])
  const totalItems = ref(0)

  const currentPage = ref(1)
  const totalPages = ref(1)
  const pageSize = ref(10)

  const withTrashed = ref(false)
  const searchTerm = ref<string | null>(null)
  const hasTags = reactive<ProjectTag['id'][]>([])

  async function loadItems() {
    loading.value = true

    const {
      data,
      _paging: { totalCount, totalPages: _totalPages },
    } = await Datasource.projects.getAll({
      pageNo: currentPage.value,
      pageSize: pageSize.value,
      includeTrashed: withTrashed.value,
      searchTerm: searchTerm.value ?? undefined,
      hasTags: hasTags,
    })

    items.value = data
    totalPages.value = _totalPages
    totalItems.value = totalCount

    loading.value = false
  }

  function setPageSize(size: number) {
    pageSize.value = size
    currentPage.value = 1
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
    currentPage.value = 1
    loadItems()
  }

  function setSearchTerm(value: string | null) {
    searchTerm.value = value
    currentPage.value = 1
    loadItems()
  }

  function addTag(tagId: ProjectTag['id']) {
    if (hasTags.includes(tagId)) return
    hasTags.push(tagId)
    currentPage.value = 1
    loadItems()
  }

  function removeTag(tagId: ProjectTag['id']) {
    const index = hasTags.indexOf(tagId)
    if (index === -1) return
    hasTags.splice(index, 1)
    currentPage.value = 1
    loadItems()
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    totalItems: readonly(totalItems),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    pageSize: readonly(pageSize),
    withTrashed: readonly(withTrashed),
    searchTerm: readonly(searchTerm),
    hasTags: readonly(hasTags),
    loadItems,
    setPageSize,
    loadPage,
    loadNextPage,
    loadPreviousPage,
    setIncludeTrashed,
    setSearchTerm,
    addTag,
    removeTag,
  }
})
