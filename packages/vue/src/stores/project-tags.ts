import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import type { ProjectTag } from '@geckobot/datasource'

import Datasource from '@/datasource'

export const useProjectTagsStore = defineStore('project-tags', () => {
  const loading = ref(false)

  const items = ref<ProjectTag[]>([])
  const totalItems = ref(0)

  async function loadItems() {
    loading.value = true

    const {
      data,
      _paging: { totalCount },
    } = await Datasource.projectTags.getAll()

    items.value = data
    totalItems.value = totalCount

    loading.value = false
  }

  return {
    loading: readonly(loading),
    items: readonly(items),
    totalItems: readonly(totalItems),
    loadItems,
  }
})
