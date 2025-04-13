<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

import DataTable from '@/components/DataTable/DataTable.vue'
import DataTablePagination from '@/components/DataTable/DataTablePagination.vue'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <DataTable
      :selectable="true"
      :loading="projectsStore.loading"
      :items="projectsStore.items"
      :columns="[
        ['name', 'Name'],
        ['startedAt', 'Started'],
        ['createdAt', 'Created'],
        ['updatedAt', 'Last modified'],
      ]"
    >
      <template #item.startedAt="{ item }">
        <UseTimeAgo
          v-if="item.startedAt != null"
          v-slot="{ timeAgo }"
          :time="new Date(item.startedAt)"
        >
          {{ timeAgo }}
        </UseTimeAgo>
      </template>
      <template #item.createdAt="{ item }">
        <UseTimeAgo v-slot="{ timeAgo }" :time="new Date(item.createdAt)">
          {{ timeAgo }}
        </UseTimeAgo>
      </template>
      <template #item.updatedAt="{ item }">
        <UseTimeAgo v-slot="{ timeAgo }" :time="new Date(item.updatedAt)">
          {{ timeAgo }}
        </UseTimeAgo>
      </template>
      <template #no-items>No projects found.</template>
    </DataTable>
  </div>
  <div class="mt-4 text-center">
    <DataTablePagination
      :current-page="projectsStore.currentPage"
      :total-pages="projectsStore.totalPages"
      @go-to-page="(page) => projectsStore.loadPage(page)"
      @next-page="projectsStore.loadNextPage"
      @previous-page="projectsStore.loadPreviousPage"
    />
  </div>
</template>
